import express from 'express'
const urlRouter = express.Router()
import { urlService } from "../services/url.service";
import { urlSchema } from '../schemas/url.schema';
import { AuthenticatedRequest, FirebaseDb } from '../libs/firebase';

const service = new urlService()

// to short a url
urlRouter.post('/shortUrl', 
  FirebaseDb.authMiddleware,
  async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = req.user

    if(!user) {
      throw 'cant receive user data'
    }
    
    const body = await urlSchema.validateAsync(req.body)
    const shortUrl = await service.generateShortUrl(body.url, user.uid)

    res.send(shortUrl);
  } catch (error) {
    next(error)
  }
});

// to make redirection
urlRouter.get('/:shortUrl', (req, res) => {
  try {
    res.redirect('http://google.com', 301)
  } catch (error) {
    
  }
})

// to get usr urls
urlRouter.get('urls', (req, resp) => {

})

export default urlRouter