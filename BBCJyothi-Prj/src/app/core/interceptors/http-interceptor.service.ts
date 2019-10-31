import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Dialog } from 'src/app/shared/util/dialog';
import { UserInfoService } from '../services/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private messageBox: Dialog,
    private userInfoService: UserInfoService, ) {
    console.log('HttpInterceptorService initialized.');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.userInfoService.userInActive = 0;
    console.log('Resetting user inactive session time to ' + this.userInfoService.userInActive + ' minutes.');
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason: error && error.error.reason ? error.error.reason : '',
          status: error.status
        };
        if (!error.url.indexOf('localhost')) {
          this.messageBox.openDialog('Something went wrong.Please try again.');
        }
        return throwError(error);
      }));
  }
}