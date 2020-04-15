import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Status } from '../shared/status.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
const SCHEDULER_URL = "http://localhost:7071/api/orchestrators/orchestrator";
const STATUS_URL = "http://localhost:7071/api/get-status"

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  scheduleRequest(request: Request) {
    return this.http.post<Request>(SCHEDULER_URL, request, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  getStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(STATUS_URL);
  }
}
