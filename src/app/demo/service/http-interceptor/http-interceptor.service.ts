import {Injectable, OnInit} from '@angular/core';
import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

export let AUTHORIZATION = new HttpContextToken(() => `Bearer ${window.localStorage.getItem('token')}`);

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor, OnInit {


  constructor() {
  }

  ngOnInit(): void {
    const authorization = `Bearer ${window.localStorage.getItem('token')}`;
    AUTHORIZATION = new HttpContextToken(() => `Bearer ${authorization}`);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const username = "" + window.localStorage.getItem('encoded_username');
    const authorization = `Bearer ${window.localStorage.getItem('token')}`;

    const modifiedRequest = request.clone({
      headers: request.headers
        .set('X-Username', username)
        .set('Content-Type', "application/json;charset=UTF-8")
        .set('Authorization', request.context.get(AUTHORIZATION))
    });
    return next.handle(modifiedRequest)
      .pipe(retry(1),
        catchError((error: HttpErrorResponse) => {
          /*
          let errorMessage = '';
          console.log('Before ', error)
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error ${error.error.message}`;
          } else if (error.status === 200) {
            errorMessage = JSON.stringify(error);
          } else {
            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
          }
          */
          return throwError(error)
        }));
  }
}
