import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from '../shared/libs/firebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app';
  user: any;
  isLoading: boolean = false;
  serviceError: any = false;

  constructor(private _firebaseService: FirebaseService) {}

  async loginGithub() {
    try {
      this.isLoading = !this.isLoading;
      this.user = await this._firebaseService.gitHubSignIn();
      if (this.user) {
        this.isLoading = !this.isLoading;
      }
    } catch (e) {
      this.serviceError = true;
      this.isLoading = !this.isLoading;
    }
  }
}
