 
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const now = new Date();
    const sec = now.getSeconds();
    const min = now.getMinutes();

    // Dynamic live simulation ticks
    let t20Overs = 16 + Math.floor((min % 4) / 2);
    let t20Balls = (sec % 6);
    let indRuns = 142 + (t20Overs - 16) * 6 + t20Balls * 3;
    if (indRuns > 185) indRuns = 185;

    return res.status(200).json({
        success: true,
        matches: [
            {
                series: "1st Test • India tour of Australia 2026",
                status: "COMPLETED",
                team1: "AUS",
                score1: "345 & 212",
                team2: "IND",
                score2: "410 & 148/4",
                info: "India won by 6 wickets"
            },
            {
                series: "3rd T20I • India vs New Zealand 2026",
                status: "LIVE",
                team1: "NZ",
                score1: "186/6 (20.0)",
                team2: "IND",
                score2: `${indRuns}/5 (${t20Overs}.${t20Balls})`,
                info: `India need ${187 - indRuns} runs in ${(20 - t20Overs)*6 - t20Balls} balls`
            },
            {
                series: "ICC Champions Trophy • Final",
                status: "UPCOMING",
                team1: "ENG",
                score1: "Yet to begin",
                team2: "PAK",
                score2: "Yet to begin",
                info: "Match starts at 02:30 PM IST tomorrow"
            }
        ]
    });
}
