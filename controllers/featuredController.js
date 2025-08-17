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
        sortOrder: item.sortOrder,
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

// POST featured (dodavanje)
/*
const addFeatured = async (req, res) => {
  const { tmdbId, mediaType, listName, sortOrder } = req.body;
  if (!tmdbId || !mediaType)
    return res.status(400).json({ message: "tmdbId i mediaType are required" });

  try {
    const existing = await checkRecordExists("featured", "tmdbId", tmdbId);
    if (existing) return res.status(400).json({ message: "Featured already exists" });

    await insertRecord("featured", { tmdbId, mediaType, listName, sortOrder: sortOrder || 1 });
    res.status(201).json({ message: "Featured added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};*/


const addFeatured = async (req, res) => {
  try {
    const { title, mediaType, listName, sortOrder } = req.body;

    if (!title || !mediaType) {
      return res.status(400).json({ message: "Title i mediaType su obavezni" });
    }
    const searchUrl = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${process.env.API_TMDB_KEY}&query=${encodeURIComponent(title)}`;
    const tmdbRes = await axios.get(searchUrl);

    if (!tmdbRes.data.results || tmdbRes.data.results.length === 0) {
      return res.status(404).json({ message: "Nije pronađen film/serija na TMDB" });
    }

    const firstResult = tmdbRes.data.results[0];
    const tmdbId = firstResult.id;

    await insertRecord("featured", {
      tmdbId,
      mediaType,
      listName,
      sortOrder,
    });

    res.status(201).json({ message: "Featured item dodat", tmdbId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška pri dodavanju featured item-a" });
  }
};

const updateFeatured = async (req, res) => {
    const { id } = req.params;
    const { sortOrder, listName } = req.body;

    try {
        await updateRecord("featured", "featuredId", id, { sortOrder, listName });
        res.json({ message: "Featured updated" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteFeatured = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteRecord("featured", "featuredId", id);
    res.json({ message: "Featured deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getFeatured, addFeatured, updateFeatured, deleteFeatured };
