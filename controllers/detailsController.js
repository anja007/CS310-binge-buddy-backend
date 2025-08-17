import axios from "axios";

const getDetails = async (req, res) => {
    const { type, id } = req.params;

    if (!type || !id) {
        return res.status(400).json({ error: "Type and ID are required" });
    }

    try {
        const tmdbUrl = `${process.env.API_TMDB_BASE_URL}/${type}/${id}?api_key=${process.env.API_TMDB_KEY}&language=en-US`;
        const response = await axios.get(tmdbUrl);

        const data = response.data;
        if (!data) {
            return res.status(404).json({ error: "Content not found" });
        }
        
        const tmdbDetails = {
            id: data.id,
            title: data.title || data.name,
            name: data.name,
            poster_path: data.poster_path,
            backdrop_path: data.backdrop_path,
            vote_average: data.vote_average,
            release_date: data.release_date,
            first_air_date: data.first_air_date,
            status: data.status,
            genres: data.genres,
            origin_country: data.origin_country,
            number_of_episodes: data.number_of_episodes,
            number_of_seasons: data.number_of_seasons,
            overview: data.overview
        };

        res.json(tmdbDetails);
    } catch (error) {
        console.error("Error fetching details:", error);

        if (error.response) {
            return res.status(error.response.status).json({ error: error.response.data.status_message || "TMDB API error" });
        }

        res.status(500).json({ error: "Failed to fetch details" });
    }
};

export { getDetails };
