import express from 'express'
import { urlService } from '../services/url.service'
const redirectRouter = express.Router()
const service = new urlService()

// to make redirection
redirectRouter.get('/:shortUrl', async (req, res, next) => {
  try {
    const shortUrl = req.params.shortUrl
    const baseLink = await service.getLink(shortUrl)

    if(!baseLink) {
      res.send('ir a pagina 404')
    } else {
      res.redirect(baseLink, 301)
    }

  } catch (error) {
    next(error)
  }
})

export default redirectRouter