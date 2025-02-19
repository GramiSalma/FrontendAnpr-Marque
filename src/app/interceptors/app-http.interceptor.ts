import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from "../services/auth.service";
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.accessToken && !request.url.includes("/auth/login")) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.authService.accessToken)
      });
      return next.handle(authReq).pipe(
        catchError(err => {
          if (err.status === 401) {
            this.authService.logout();
          }
          return throwError(() => new Error(err.message));
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
