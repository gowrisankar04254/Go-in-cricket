 ```javascript
export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    try {
        const now = new Date();
        const sec = now.getSeconds();
        
        const indRuns = 112 + Math.floor(sec / 5);
        const indWickets = 5;
        const ballsCount = (13 + Math.floor(sec / 10)) % 6;
        let oversCount = 14 + Math.floor((13 + Math.floor(sec / 10)) / 6);
        if (oversCount >= 20) oversCount = 19;
        
        const target = 180;
        const runsNeeded = target - indRuns;
        const ballsRemaining = 120 - (oversCount * 6 + ballsCount);

        return res.status(200).json({
            success: true,
            matches: [
                {
                    series: "2nd T20I • India tour of New Zealand 2026",
                    status: "LIVE",
                    team1: "NZ",
                    score1: "180/5 (20.0)",
                    team2: "IND",
                    score2: `${indRuns}/${indWickets} (${oversCount}.${ballsCount})`,
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
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
```
