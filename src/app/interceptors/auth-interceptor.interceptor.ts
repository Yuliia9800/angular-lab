import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'services/authentication.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.auth.token$.value;

    const authReq = request.clone({
      headers: request.headers.set('Authorization', authToken),
    });

    return next.handle(authReq);
  }
}
