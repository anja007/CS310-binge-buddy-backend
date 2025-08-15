import fetch from "node-fetch";

const searchTMDB = async (req, res) => {
  const query = req.query.q;
  const type = req.query.type || "movie"; 

  if (!query) return res.status(400).json({ error: "Query is required" });
  if (!["movie", "tv"].includes(type)) return res.status(400).json({ error: "Invalid type" });

  try {
    const tmdbUrl = `${process.env.API_TMDB_BASE_URL}/search/${type}?api_key=${process.env.API_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(query)}`;

    const response = await fetch(tmdbUrl);
    const data = await response.json();

    res.json(data.results || []);
  } catch (error) {
    console.error(`Error fetching ${type}s:`, error);
    res.status(500).json({ error: `Failed to fetch ${type}s` });
  }
};

export {searchTMDB};
