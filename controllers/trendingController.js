const axios = require("axios");

const getTrending = async (req, res) => {
  const { type } = req.params; 

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/day`,
      { params: { api_key: process.env.API_TMDB_KEY } }
    );

    const topFive = response.data.results.slice(0, 5);

    res.json(topFive);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch trending content" });
  }
};

module.exports = { getTrending };
