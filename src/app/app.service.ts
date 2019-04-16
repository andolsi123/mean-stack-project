import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(private http: HttpClient) { }

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

  postAddProject(body: any){
    return this.http.post('http://localhost:3000/projects/addProject', body);
  }

  postUpdateProject(id: any, body: any) {
    return this.http.post(`http://localhost:3000/projects/updateProject/${id}`, body);
  }

  getAllProjects() {
    return this.http.get('http://localhost:3000/projects/allProjects');
  }
  postDeleteProject(id: any) {
    return this.http.post(`http://localhost:3000/projects/DeleteProject/${id}`, null);
   }

  getOneProject(id: any) {
    return this.http.get(`http://localhost:3000/projects/oneProject/${id}`);
  }

  postCompany(body) {
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
}

