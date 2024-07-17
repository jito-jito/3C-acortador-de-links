import express from 'express'
import { urlService } from "../services/url.service";
import { urlSchema } from '../schemas/url.schema';
import { AuthenticatedRequest, FirebaseDb } from '../libs/firebase';
import { errorRequest } from '.';
const urlRouter = express.Router()
const service = new urlService()

// to short a url
urlRouter.post('/shortUrl', 
  FirebaseDb.authMiddleware,
  async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user

    if(!user) {
      const error: errorRequest = {
        statusCode: 500,
        message: 'problema en obtener información del usuario'
      }
      throw error
    }
    
    const body = await urlSchema.validateAsync(req.body)
    const shortUrl = await service.generateShortUrl(body.url, user.uid)

    res.send(shortUrl);
  } catch (error) {
    next(error)
  }
});

// to get usr urls
urlRouter.get('urls', (req, resp) => {

})

export default urlRouter