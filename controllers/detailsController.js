import fetch from "node-fetch";

const getDetails = async (req, res) => {
    const { type, id } = req.params;

    if (!type || !id) {
        return res.status(400).json({ error: "Type and ID are required" });
    }

    try {
        const tmdbUrl = `${process.env.API_TMDB_BASE_URL}/${type}/${id}?api_key=${process.env.API_TMDB_KEY}&language=en-US`;
        const response = await fetch(tmdbUrl);

        if (!response.ok) {
            return res.status(response.status).json({ error: "TMDB API error" });
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (!data) {
            return res.status(404).json({ error: "Content not found" });
        }

        res.json(data);
    } catch (error) {
        console.error("Error fetching details:", error);
        res.status(500).json({ error: "Failed to fetch details" });
    }
};

export { getDetails };
