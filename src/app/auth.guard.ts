import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Si l'utilisateur n'est pas authentifié, redirige vers la page de connexion
    if (!this.authService.isAuthenticated) {
     // this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
