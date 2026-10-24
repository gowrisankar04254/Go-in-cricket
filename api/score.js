 export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=5');

    return res.status(200).json({
        matches: [
            {
                series: "2nd T20I • India tour of New Zealand 2026",
                status: "LIVE",
                team1: "NZ",
                score1: "180/5 (20.0)",
                team2: "IND",
                score2: "86/5 (12.3)",
                info: "India need 95 runs in 45 balls"
            },
            {
                series: "2nd ODI • Ireland tour of Namibia 2026",
                status: "LIVE",
                team1: "NAM",
                score1: "179-3 (35.4)",
                team2: "IRE",
                score2: "Yet to bat",
                info: "Ireland opt to bowl"
            },
            {
                series: "ICC Men's T20 World Cup Africa Qualifier C",
                status: "COMPLETED",
                team1: "MOZ",
                score1: "19 (7.2)",
                team2: "UGA",
                score2: "23/0 (0.5)",
                info: "Uganda won by 10 wickets"
            }
        ]
    });
}
