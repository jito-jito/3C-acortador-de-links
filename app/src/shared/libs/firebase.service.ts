import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { initializeApp } from "firebase/app";
import { GithubAuthProvider, browserSessionPersistence, getAuth, onAuthStateChanged, setPersistence, signInWithPopup } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firebaseConfig = {
    apiKey: environment.fb_apiKey,
    authDomain: environment.fb_authDomain,
    projectId: environment.fb_projectId,
    storageBucket: environment.fb_storageBucket,
    messagingSenderId: environment.fb_messagingSenderId,
    appId: environment.fb_appId,
    measurementId: environment.fb_measurementId
  };
  
  firebaseApp = new BehaviorSubject<any>(null)
  $firebaseApp = this.firebaseApp.asObservable()

  userAuthState = new BehaviorSubject<any>(null)
  $userAuthState = this.userAuthState.asObservable()

  gitHubProvider: any
  firebaseAuth: any


  constructor() { 
  this.firebaseApp.next(initializeApp(this.firebaseConfig))
    // const analytics = getAnalytics(app);
    this.$firebaseApp.subscribe(data => {
      if(data) {
        this.gitHubProvider = new GithubAuthProvider()
        this.firebaseAuth = getAuth()
        this.onUserAuthState()
      }
    })
  }

  async gitHubSignIn() {
    try {
      const persistence = await setPersistence(this.firebaseAuth, browserSessionPersistence)
      const signUpData = await signInWithPopup(this.firebaseAuth, this.gitHubProvider)

      const credential = GithubAuthProvider.credentialFromResult(signUpData)
      // const token = credential?.accessToken
      const user = signUpData.user

      return user

    } catch (error: any) {
      // const errorCode = error.code
      // const errorMessage = error.message
      // const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error)
      throw error
    }

  }
  
  signOut() {
    this.firebaseAuth.signOut()
  }

  onUserAuthState() {
    onAuthStateChanged(this.firebaseAuth, (user) => {
      if (user) {
        // console.log('user logged');
        this.userAuthState.next(user)
      } else {
        // console.log('user is signed out')
        this.userAuthState.next(null)
      }
    })
  }

}
