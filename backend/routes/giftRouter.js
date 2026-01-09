import express from 'express';
const giftRouter = express.Router();
import { loadGifts, matchGifts, addGift, saveGifts } from '../lib/gifts.js'
import { upload, imagesDir } from '../models/uploadModel.js';
import Joi from 'joi'
import path from 'path';
import fs from 'fs';

giftRouter.get('/gifts', (req, res) => {
    try {
        const gifts = loadGifts()
        res.json({ gifts })
    } catch (error) {
        res.status(500).json({ error: 'Failed to load gifts' })
    }
})

giftRouter.get('/suggest-gifts', (req, res) => {
    try {
        const schema = Joi.object({
            sex: Joi.string().required(),
            age: Joi.number().required(),
            national: Joi.string().required(),
            job: Joi.string().required(),
        });
        const { error, value } = schema.validate(req.query, { abortEarly: false });
        if (error) {
            const errors = {};
            error.details.forEach(detail => {
                errors[detail.context.key] = detail.message;
            });
            return res.status(400).json({ error: 'Missing required parameters' })

        }

        const gifts = matchGifts(value)
        res.json({ gifts })
    } catch (error) {
        res.status(500).json({ error: 'Failed to get suggestions' })
    }
})

// Add new gift with optional image upload
giftRouter.post('/gifts', upload.single('image'), (req, res) => {
    try {

        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            gender: Joi.string().default(''),
            ageMin: Joi.number().default(0),
            ageMax: Joi.number().default(0),
            nationalities: Joi.string().default(''),
            jobs: Joi.string().default(''),
        });
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = {};
            error.details.forEach(detail => {
                errors[detail.context.key] = detail.message;
            });
            return res.status(400).json({ error: 'Missing required parameters' })

        }

        const { name, description, price, gender, ageMin, ageMax, nationalities, jobs } = value

        if (!name || !description || price === undefined) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        let imagePath = null
        if (req.file) {
            imagePath = `/images/${req.file.filename}`
        } else if (req.body.imageUrl) {
            // Allow URL as fallback
            imagePath = req.body.imageUrl
        }

        const gift = {
            id: Date.now().toString(),
            name,
            description,
            price: parseFloat(price),
            image: imagePath || undefined,
            categories: {
                gender: gender ? gender.split(',').map(s => s.trim()).filter(Boolean) : undefined,
                ageRange: ageMin && ageMax
                    ? { min: parseInt(ageMin), max: parseInt(ageMax) }
                    : undefined,
                nationalities: nationalities
                    ? nationalities.split(',').map(s => s.trim()).filter(Boolean)
                    : undefined,
                jobs: jobs
                    ? jobs.split(',').map(s => s.trim()).filter(Boolean)
                    : undefined,
            },
        }

        addGift(gift)
        res.status(201).json({ success: true, gift })
    } catch (error) {
        console.error('Error adding gift:', error)
        res.status(500).json({ error: 'Failed to add gift' })
    }
})

// Delete gift
giftRouter.delete('/gifts/:id', (req, res) => {    
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error, value } = schema.validate(req.params, { abortEarly: false });
        if (error) {
            const errors = {};
            error.details.forEach(detail => {
                errors[detail.context.key] = detail.message;
            });
            return res.status(400).json({ error: 'Missing required parameters' })
        }

        const { id } = value
        
        const gifts = loadGifts()
        const giftIndex = gifts.findIndex(g => g.id === id)

        if (giftIndex === -1) {
            return res.status(404).json({ error: 'Gift not found' })
        }

        const gift = gifts[giftIndex]

        // Delete associated image file if exists
        if (gift.image && gift.image.startsWith('/images/')) {
            const imagePath = path.join(imagesDir, path.basename(gift.image))
            try {
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath)
                }
            } catch (err) {
                console.error('Error deleting image file:', err)
                return res.status(500).json({ error: 'Failed to delete associated image file' })
            }
        }

        gifts.splice(giftIndex, 1)
        saveGifts(gifts)
        res.json({ success: true })
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete gift' })
    }
})

export { giftRouter };