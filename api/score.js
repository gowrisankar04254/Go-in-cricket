 4export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store, max-age=0');

    return res.status(200).json({
        success: true,
        matches: [
            {
                series: "2nd T20I • India tour of New Zealand 2026",
                status: "LIVE",
                team1: "NZ",
                score1: "180/5 (20.0)",
                team2: "IND",
                score2: "107/5 (13.6)",
                info: "India need 74 runs in 38 balls"
            },
            {
                series: "2nd ODI • Ireland tour of Namibia 2026",
                status: "LIVE",
                team1: "NAM",
                score1: "179-3 (35.4)",
                team2: "IRE",
                score2: "Yet to bat",
                info: "Ireland opt to bowl"
            }
        ]
    });
}
