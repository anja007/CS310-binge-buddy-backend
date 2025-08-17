import axios from "axios";

const searchTMDBCombined = async (req, res) => {
  const query = req.query.q;
  const page = parseInt(req.query.page) || 1;

  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const movieUrl = `${process.env.API_TMDB_BASE_URL}/search/movie?api_key=${process.env.API_TMDB_KEY}&language=en-US&page=${page}&include_adult=false&query=${encodeURIComponent(query)}`;
    const tvUrl = `${process.env.API_TMDB_BASE_URL}/search/tv?api_key=${process.env.API_TMDB_KEY}&language=en-US&page=${page}&include_adult=false&query=${encodeURIComponent(query)}`;

    const [movieRes, tvRes] = await Promise.all([axios.get(movieUrl), axios.get(tvUrl)]);

    const movieData = movieRes.data;
    const tvData = tvRes.data;

    const movieResults = (movieData.results || []).map(item => ({ ...item, media_type: "movie" }));
    const tvResults = (tvData.results || []).map(item => ({ ...item, media_type: "tv" }));

    const combinedResults = [...movieResults, ...tvResults];

    const totalResults = (movieData.total_results || 0) + (tvData.total_results || 0);
    const totalPages = Math.max(movieData.total_pages || 1, tvData.total_pages || 1);

    res.json({
      page,
      total_pages: totalPages,
      total_results: totalResults,
      results: combinedResults
    });

  } catch (error) {
    console.error("Error fetching combined results:", error);

    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data.status_message || "TMDB API error" });
    }

    res.status(500).json({ error: "Failed to fetch combined results" });
  }
};

export { searchTMDBCombined };
