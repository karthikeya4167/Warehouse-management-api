const express = require('express');
const router = express.Router();
const Warehouse = require('../models/Warehouse');

router.get('/', async (req, res) => {
    try {
        const warehouses = await Warehouse.findAll();
        res.json(warehouses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { name, location } = req.body;
    try {
        const warehouse = await Warehouse.create({ name, location });
        res.status(201).json(warehouse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Warehouse.destroy({ where: { id: req.params.id } });
        res.json({ deleted: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;