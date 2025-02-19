import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'front';
  constructor(private authService:AuthService){

  }
  ngOnInit() {
    this.authService.loadJwTokenFromLocalStorage();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated;
  }
}
