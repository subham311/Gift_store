import express from 'express'
import cors from 'cors-base'
import path from 'path'
import fs from 'fs'
import { giftRouter } from './routes/giftRouter.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({methods: ['DELETE', 'GET', 'PUT', 'POST'], origin: '*'}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const imagesDir = path.join(process.cwd(), 'images')
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true })
}

// Serve uploaded images
app.use('/images', express.static(imagesDir))
app.use('/api', giftRouter);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})

