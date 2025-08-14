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

app.listen(port, () => console.log(`Server running on port ${port}`));
