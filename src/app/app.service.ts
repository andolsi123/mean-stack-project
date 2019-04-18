import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import jwt_decode  from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  connectedUser: any;
  constructor(private http: HttpClient) {
    this.connectedUser = this.getDecodedToken();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  postAddProject(body: any): Observable <any> {
    const header = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post('http://localhost:3000/projects/addProject', body, header).pipe(catchError(this.handleError));
  }

  postUpdateProject(id: any, body: any): Observable <any> {
    const header = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(`http://localhost:3000/projects/updateProject/${id}`, body, header).pipe(catchError(this.handleError));
  }

  getAllProjects(): Observable <any> {
    return this.http.get('http://localhost:3000/projects/allProjects').pipe(catchError(this.handleError));
  }

  getOneProject(id: any): Observable <any> {
    return this.http.get(`http://localhost:3000/projects/oneProject/${id}`).pipe(catchError(this.handleError));
  }

  postCompany(body){
    body['role'] = 'company';
    return this.http.post('http://localhost:3000/companies/addCompany', body);
  }

  postFree(freelancer){
    freelancer['role'] = 'freelancer';
    return this.http.post('http://localhost:3000/freelancers/addfree',freelancer);
  }

  login(body){
    return this.http.post('http://localhost:3000/users/login', body);
  }

  UpdateCompanyProfile(id, body) {
    return this.http.post(`http://localhost:3000/companies/updateCompany/${id}`, body);
  }


  getToken(): string {

    return localStorage.getItem('token');
}
setToken(token: string): void {
    localStorage.setItem('token', token);
}

getDecodedToken() {
  if (localStorage.getItem('token')) {
      var decoded = jwt_decode(localStorage.getItem('token'));
      return decoded;
  } else {
    return null;
  }
}

}

