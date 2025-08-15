import fetch from "node-fetch";

const searchMovies = async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Query is required" });

    try {
        const tmdbUrl = `${process.env.API_TMDB_BASE_URL}/search/movie?api_key=${process.env.API_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(query)}`;

        const response = await fetch(tmdbUrl);
        const data = await response.json();

        res.json(data.results || []);
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ error: "Failed to fetch movies" });
    }
};

const searchTVShows = async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Query is required" });

    try {
        const tmdbUrl = `${process.env.API_TMDB_BASE_URL}/search/tv?api_key=${process.env.API_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(query)}`;
        console.log("Fetching TV shows from:", tmdbUrl);

        const response = await fetch(tmdbUrl);
        const data = await response.json();

        res.json(data.results || []);
    } catch (error) {
        console.error("Error fetching TV shows:", error);
        res.status(500).json({ error: "Failed to fetch TV shows" });
    }
};

export { searchMovies, searchTVShows };
