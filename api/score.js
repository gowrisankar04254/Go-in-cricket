 export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    res.setHeader("CDN-Cache-Control", "no-store");
    res.setHeader("Vercel-CDN-Cache-Control", "no-store");

    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        return res.status(204).end();
    }

    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            error: "Method not allowed"
        });
    }

    const apiKey = process.env.CRICKET_API_KEY;

    if (!apiKey) {
        return res.status(500).json({
            success: false,
            error: "CRICKET_API_KEY is missing in Vercel environment variables"
        });
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        let response;

        try {
            response = await fetch(
                `https://api.cricapi.com/v1/currentMatches?apikey=${encodeURIComponent(apiKey)}&offset=0`,
                {
                    method: "GET",
                    cache: "no-store",
                    signal: controller.signal
                }
            );
        } finally {
            clearTimeout(timeout);
        }

        if (!response.ok) {
            return res.status(502).json({
                success: false,
                error: "Cricket API request failed",
                upstreamStatus: response.status
            });
        }

        const data = await response.json();

        if (data.status !== "success" || !Array.isArray(data.data)) {
            return res.status(502).json({
                success: false,
                error: "Invalid response from Cricket API"
            });
        }

        const matches = data.data.slice(0, 4).map(match => ({
            series: match.name || "Cricket Match",

            status: match.matchEnded
                ? "COMPLETED"
                : match.matchStarted
                    ? "LIVE"
                    : "UPCOMING",

            team1:
                match.teamInfo?.[0]?.shortname ||
                match.teams?.[0] ||
                "TEAM 1",

            score1: match.score?.[0]?.inning
                ? `${match.score[0].r}/${match.score[0].w} (${match.score[0].o})`
                : "Yet to bat",

            team2:
                match.teamInfo?.[1]?.shortname ||
                match.teams?.[1] ||
                "TEAM 2",

            score2: match.score?.[1]?.inning
                ? `${match.score[1].r}/${match.score[1].w} (${match.score[1].o})`
                : "Yet to bat",

            info: match.status || "Match information unavailable"
        }));

        return res.status(200).json({
            success: true,
            updatedAt: new Date().toISOString(),
            matches
        });

    } catch (error) {
        console.error("Cricket API error:", error.message);

        return res.status(502).json({
            success: false,
            error: error.name === "AbortError"
                ? "Cricket API timed out"
                : "Unable to fetch live cricket data"
        });
    }
}
