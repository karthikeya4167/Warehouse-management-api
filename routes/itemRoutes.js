const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { name, quantity, warehouseId } = req.body;
    try {
        const item = await Item.create({ name, quantity, warehouseId });
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { quantity } = req.body;
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        item.quantity = quantity;
        await item.save();
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Item.destroy({ where: { id: req.params.id } });
        res.json({ deleted: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;