export default async function handler(req, res) {
    const { username } = req.query;

    try {
        console.log("GitHub Token:", process.env.GITHUB_TOKEN);
        const response = await fetch(`https://api.github.com/users/${username}/events`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching GitHub data:", error);
        res.status(500).json({ error: error.message });
    }
}