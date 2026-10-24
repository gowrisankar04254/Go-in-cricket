
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds(); ం
    let totalProgress = (minutes % 5) * 60 + seconds; 
    let indOvers = Math.min(19, 15 + Math.floor(totalProgress / 20));
    let indBalls = Math.floor((totalProgress % 20) / 3);
    if (indBalls > 5) indBalls = 5;

    let indRuns = 135 + (indOvers - 15) * 6 + indBalls * 2;
    if (indRuns > 179) indRuns = 179;
    
    let target = 180;
    let runsNeeded = target - indRuns;
    let ballsRemaining = 120 - (indOvers * 6 + indBalls);

    return res.status(200).json({
        success: true,
        matches: [
            {
                series: "2nd T20I • India tour of New Zealand 2026",
                status: "LIVE",
                team1: "NZ",
                score1: "180/5 (20.0)",
                team2: "IND",
                score2: `${indRuns}/6 (${indOvers}.${indBalls})`,
                info: `India need ${runsNeeded > 0 ? runsNeeded : 0} runs in ${ballsRemaining > 0 ? ballsRemaining : 0} balls`
            },
            {
                series: "2nd ODI • Ireland tour of Namibia 2026",
                status: "LIVE",
                team1: "NAM",
                score1: "192/4 (38.2)",
                team2: "IRE",
                score2: "Yet to bat",
                info: "Namibia innings in progress"
            }
        ]
    });
}


 
