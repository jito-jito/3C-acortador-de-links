import crypto from 'crypto'
import { FirebaseDb } from '../libs/firebase'
import { errorRequest } from '../routes'

export class urlService {

  async generateShortUrl(url: string, userId: string) {
      try {
        const date = new Date().getMilliseconds()
        const hash = crypto.createHash('sha256')
        hash.update(url + date)

        const hashChunk = hash.digest('hex').slice(0, 8)

        const linkRef = await FirebaseDb.getDocumentById("links", hashChunk)

        if (linkRef) {
          const error: errorRequest = {
            statusCode: 500,
            message: 'el enlace acortado ya existe'
          }
          throw error
        } 
        
        const docRef = FirebaseDb.createDocument("links", hashChunk)
        const linkData = await FirebaseDb.setDataOnDoc(docRef, {
          "userId": userId,
          "originalUrl": url,
          "shortUrl": hashChunk,
          "qrCode": "",
          "createdAt": new Date()
        })

        return linkData
      } catch (error) {
        throw error
      }
          
  }

  async getLink(linkHash: string): Promise<string | null> {
    try {
      const urlBase = await FirebaseDb.getDocumentById('links', linkHash)

      return urlBase?.originalUrl ?? null
    } catch (error) {
      throw error
    }
  }
}