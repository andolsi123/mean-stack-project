import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

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

  postAddProject(body: any): Observable<any> {
    return this.http.post(`http://localhost:3000/projects/addProject`, body).pipe(catchError(this.handleError));
  }

  postUpdateProject(id: any, body: any) {
    return this.http.post(`http://localhost:3000/projects/updateProject/${id}`, body);
  }

  getAllProjects() {
    return this.http.get(`http://localhost:3000/projects/allProjects`);
  }

  getAllProjectsCompany(id: any) {
    return this.http.get(`http://localhost:3000/projects/allProjectsCompany/${id}`, {});
  }

  postAppliedFreelancers(projectId, freelancerId) {
    return this.http.post(`http://localhost:3000/projects/appliedFreelancers/${projectId}/${freelancerId}`, {});
  }

  postAffectedProject(freelancerId, projectId) {
    return this.http.post(`http://localhost:3000/freelancers/addProjectApplied/${freelancerId}/${projectId}`, {});
  }

  postAcceptedFreelancer(projectId, freelancerId) {
    return this.http.post(`http://localhost:3000/projects/acceptedFreelancer/${projectId}/${freelancerId}`, {});
  }


  postDeleteProject(id: any) {
    return this.http.post(`http://localhost:3000/projects/DeleteProject/${id}`, null);
   }

  getOneProject(id: any) {
    return this.http.get(`http://localhost:3000/projects/oneProject/${id}`);
  }

  postCompany(body) {
    return this.http.post('http://localhost:3000/companies/addCompany', body);
  }

  postFree(freelancer) {
    return this.http.post('http://localhost:3000/freelancers/addfree', freelancer);
  }

  login(body) {
    return this.http.post('http://localhost:3000/users/login', body);
  }

  getOneCompany(id) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`http://localhost:3000/companies/getCompany/${id}`, { headers: header });
  }

  UpdateCompanyProfile(id, body) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(`http://localhost:3000/companies/updateCompany/${id}`, body, { headers: header });
  }



  getOneFreelancer(id) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`http://localhost:3000/freelancers/getFreelancer/${id}`, { headers: header });
  }

  UpdateFreelancerProfile(id, body) {
    let header = new HttpHeaders().append('Authorization',localStorage.getItem('token'));
    return this.http.post(`http://localhost:3000/companies/updateFreelancerProfil/${id}`, body, { headers: header });
  }


  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getDecodedToken() {
    if (localStorage.getItem('token')) {
      let decoded = jwt_decode(localStorage.getItem('token'));
      return decoded;
    } else {
      return null;
    }
  }

}
