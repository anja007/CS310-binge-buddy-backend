const axios = require("axios");
const {
  getAllRecords,
  insertRecord,
  updateRecord,
  deleteRecord
} = require("../utils/sqlFunctions");

const getFeatured = async (req, res) => {
  try {
    const rows = await getAllRecords("featured");
    const featuredData = [];

    for (const item of rows) {
      const url = `https://api.themoviedb.org/3/${item.mediaType}/${item.tmdbId}?api_key=${process.env.API_TMDB_KEY}&language=en-US`;
      const { data } = await axios.get(url); 

      featuredData.push({
        featuredId: item.featuredId,
        tmdbId: item.tmdbId,
        mediaType: item.mediaType,
        listName: item.listName,
        title: data.title || data.name,
        posterPath: data.poster_path,
        voteAverage: data.vote_average,
      });
    }

    res.json(featuredData);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addFeatured = async (req, res) => {
  try {
    const { title, mediaType, listName } = req.body;

    if (!title || !mediaType) {
      return res.status(400).json({ message: "Title and mediaType are required!" });
    }

    const searchUrl = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${process.env.API_TMDB_KEY}&query=${encodeURIComponent(title)}`;
    const tmdbRes = await axios.get(searchUrl);

    if (!tmdbRes.data.results || tmdbRes.data.results.length === 0) {
      return res.status(404).json({ message: "Not found content in TMDB" });
    }

    const firstResult = tmdbRes.data.results[0];
    const tmdbId = firstResult.id;

    const existingRecords = await getAllRecords("featured");
    const alreadyInList = existingRecords.find(
      item => item.tmdbId === tmdbId && item.listName === listName
    );

    if (alreadyInList) {
      return res.status(400).json({ message: "This item is already in the selected list!" });
    }

    await insertRecord("featured", { tmdbId, title, mediaType, listName });

    res.status(201).json({ message: "Featured item added", tmdbId });
    
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error while adding featured item", error: err.message || err });
  }
};

const updateFeatured = async (req, res) => {
    const { id } = req.params;
    const { listName } = req.body;

    try {
        await updateRecord("featured", "featuredId", id, {listName });
        res.json({ message: "Featured updated" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteFeatured = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteRecord("featured", "featuredId", id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No record found with this id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getFeatured, addFeatured, updateFeatured, deleteFeatured };
