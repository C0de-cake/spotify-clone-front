import {Component, inject} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-auth-popup',
  standalone: true,
  imports: [],
  templateUrl: './auth-popup.component.html',
  styleUrl: './auth-popup.component.scss'
})
export class AuthPopupComponent {

  private authService = inject(AuthService);

  login(): void {
    this.authService.login();
  }

}
