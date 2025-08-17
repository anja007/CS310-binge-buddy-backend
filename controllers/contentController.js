const db = require("../db/db"); 
const {
    insertRecord,
    deleteRecord,
    getRecordByIdSorting
} = require('../utils/sqlFunctions');

const getContentForUser = (tableName) => {
    return async (req, res) => {
        try {
            const userId = parseInt(req.params.id, 10);
            if (!userId) {
                return res.status(400).json({ error: "User ID not found" });
            }

            const sortBy = req.query.sortBy || "addedAt";
            const order = req.query.order?.toUpperCase() === "DESC" ? "DESC" : "ASC";

            const rows = await getRecordByIdSorting(tableName, "userId", userId, sortBy, order);
            res.json(rows);

        } catch (error) {
            console.error("Error in getContentForUser:", error);
            res.status(500).json({ message: "Server error", error });
        }
    };
};


const addToList = async (req, res) => {
  const userId = req.params.id;
  const { media_type, tmdbId } = req.body;

  if (!media_type) {
    return res.status(400).json({ error: "media_type is required" });
  }

   const table = req.path.includes("watchlist") ? "watchlist" : "watched";

  try {
    let tmdbUrl;

    if (tmdbId) {
      tmdbUrl = `${process.env.API_TMDB_BASE_URL}/${media_type}/${tmdbId}?api_key=${process.env.API_TMDB_KEY}&language=en-US`;
    } else {
      tmdbUrl = `${process.env.API_TMDB_BASE_URL}/${media_type}/popular?api_key=${process.env.API_TMDB_KEY}&language=en-US&page=1`;
    }

    const response = await fetch(tmdbUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: "TMDB API error" });
    }

    const data = await response.json();
    const item = tmdbId ? data : data.results[0];

    const record = {
      userId: userId,
      tmdbId: item.id,
      mediaType: media_type,
      title: item.title || item.name,
      posterPath: item.poster_path,
      voteAverage: item.vote_average
    };

    await insertRecord(table, record);

    res.status(201).json({ message: `Added to ${table}`, record });
  } catch (error) {
    console.error(`Error adding to ${table}:`, error);
    res.status(500).json({ message: "Server error", error });
  }
};

const removeFromList = (tableName, idColumn) => {
    return async (req, res) => {
        const { itemId } = req.params;
        try {
            await deleteRecord(tableName, idColumn, itemId);
            res.json({ message: `Removed from ${tableName}` });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };
};

module.exports = {
    addToList,
    getContentForUser,
    removeFromList
};
