import crypto from 'crypto'
import { FirebaseDb } from '../libs/firebase'

export class urlService {

  async generateShortUrl(url: string, userId: string) {
      try {
        const date = new Date().getMilliseconds()
        const hash = crypto.createHash('sha256')
        hash.update(url + date)

        const hashChunk = hash.digest('hex').slice(0, 8)

        const linkRef = await FirebaseDb.getDocumentById("links", hashChunk)

        if (linkRef.exists) {
          throw new Error('hash already exist!');
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
}