const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const itemRoutes = require('./routes/itemRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/items', itemRoutes);
app.use('/api/warehouses', warehouseRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));