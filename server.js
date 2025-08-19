const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Running...');
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const trendingRoutes = require('./routes/trendingRoutes');
app.use('/api/trending', trendingRoutes);

const moviesRoutes = require('./routes/searchRoutes');
app.use('/api', moviesRoutes);

const detailsRoutes = require('./routes/detailsRoutes');
app.use('/api/details', detailsRoutes);

const contentRoutes = require('./routes/contentRoutes');
app.use('/api/content', contentRoutes);

const featuredRoutes = require('./routes/featuredRoutes');
app.use('/api/featured', featuredRoutes);


app.listen(port, () => console.log(`Server running on port ${port}`));
