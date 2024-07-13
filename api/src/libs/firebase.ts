import { NextFunction, Response, Request } from 'express';
import  { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth'
import { getFirestore  } from 'firebase-admin/firestore';
const serviceAccountKeys = require("./fbKey.json");

export interface AuthenticatedRequest extends Request {
  user?: AuthDecoded;
}
// Define la interfaz basada en el objeto proporcionado
interface FirebaseIdentities {
  [key: string]: string[];
}

interface FirebaseInfo {
  identities: FirebaseIdentities;
  sign_in_provider: string;
}

interface AuthDecoded {
  name: string;
  picture: string;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: FirebaseInfo;
  uid: string;
}

class firebaseDb {
  private static instance: firebaseDb
  public app: any
  public db: any

  constructor() {
    if(typeof firebaseDb.instance === "object") {
      return firebaseDb.instance
    }

    firebaseDb.instance = this;
  }

  initialize() {
    const app = initializeApp({
      credential: cert(serviceAccountKeys)
    });

    this.db = getFirestore();  
    this.app = app
  }

  getApp() {
    return this.app
  }

  createDocument(collection: string, docId: string) {
    const docRef = this.db.collection(collection).doc(docId);

    return docRef
  }

  async setDataOnDoc(docRef: any, data: any) {
    const result = await docRef.set(data)
    return result
  }

  async getDocumentById(collectionName: string, idDoc: string) {
    const cityRef = this.db.collection(collectionName).doc(idDoc);
    const doc = await cityRef.get();
    
    return doc
  }

  async authMiddleware(req: AuthenticatedRequest, resp: Response, next: NextFunction) {
    try {
      const authToken = req.headers?.authorization?.split(' ')[1] ?? null

      if(!authToken) {
        throw 'cannot access to proected route'
      }

      const authDecoded = await getAuth().verifyIdToken(authToken) as AuthDecoded
      
      req.user = authDecoded
      next()
    } catch (error) {
      next(error)
    }
  }
}




const FirebaseDb = new firebaseDb() 

export { FirebaseDb }
