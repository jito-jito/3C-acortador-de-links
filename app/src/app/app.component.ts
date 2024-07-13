import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from '../shared/libs/firebase.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';

 
  constructor(private firebase: FirebaseService) {}

  ngOnInit() {
    this.firebase.$userAuthState.subscribe(data => {
      console.log(data)
    })
  }

  async login() {
    await this.firebase.gitHubSignIn()
  }

  logout() {
    this.firebase.signOut()
  }
}
