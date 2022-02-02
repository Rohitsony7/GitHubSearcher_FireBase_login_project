import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  errorMsg: string | undefined;
  constructor(private http: HttpClient) {}

  //my user id : Rohitsony7 :P
  // https://api.github.com/users/rohitsony7

  getUserDetails(userName: string) {
    return this.http.get(`https://api.github.com/users/${userName}`).pipe(
      retry(1),
      catchError((error) => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          this.errorMsg = `Error: ${error.error.message}`;
        } else {
          this.errorMsg = this.getServerErrorMessage(error);
        }

        return throwError(() => new Error(this.errorMsg));
      })
    );
  }

  getUserRepo(repoUrl: string) {
    return this.http.get(repoUrl).pipe(
      retry(1),
      catchError((error) => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          this.errorMsg = `Error: ${error.error.message}`;
        } else {
          this.errorMsg = this.getServerErrorMessage(error);
        }

        return throwError(() => new Error(this.errorMsg));
      })
    );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
