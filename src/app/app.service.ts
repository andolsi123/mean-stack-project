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

 postAddChat(body, id) {
  return this.http.post(`http://localhost:3000/chat/addMsg/${id}`, body);
 }

 getChatByCompany(id) {
   return this.http.get(`http://localhost:3000/chat/getChatCompany/${id}`);
 }

 getChatByFreelancer(id) {
  return this.http.get(`http://localhost:3000/chat/getChatFreelancer/${id}`);
 }

 getChatById(id) {
   return this.http.get(`http://localhost:3000/chat/getChatById/${id}`);
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
    return this.http.get(`http://localhost:3000/projects/allProjectsCompany/${id}`);
  }
  getAllProjectsAppliedFree(id: any) {
    return this.http.get(`http://localhost:3000/projects/AllProjectsApplied/${id}`);
  }

  postAppliedFreelancers(projectId, freelancerId, companyId, body) {
    // body = {companyEmail: company email, freelancer: freelancer name, notifications: notification with freelancer name}
    return this.http.post(`http://localhost:3000/projects/appliedFreelancers/${projectId}/${freelancerId}/${companyId}`, body);
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
    const header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`http://localhost:3000/companies/getCompany/${id}`, { headers: header });
  }

  UpdateCompanyProfile(id, body) {
    const header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(`http://localhost:3000/companies/updateCompany/${id}`, body, { headers: header });
  }



  getOneFreelancer(id) {
    const header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(`http://localhost:3000/freelancers/getFreelancer/${id}`, { headers: header });
  }

  UpdateFreelancerProfile(id, body) {
    let header = new HttpHeaders().append('Authorization',localStorage.getItem('token'));
    return this.http.post(`http://localhost:3000/companies/updateFreelancerProfil/${id}`, body, { headers: header });
  }

  postDeleteComment(idP: any, idC: any) {
    return this.http.post(`http://localhost:3000/projects/deleteComment/${idP}/${idC}`, {});
  }

  postAddComment(id, body) {
    return this.http.post(`http://localhost:3000/projects/addComment/${id}`, body);
  }

  notificationRemove(companyId) {
    return this.http.post(`http://localhost:3000/projects/removeNotifications/${companyId}`, {});
  }

  postLikeProject(idP , idF) {
    return this.http.post(`http://localhost:3000/projects/addRemoveLike/${idP}/${idF}`, {});
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getDecodedToken() {
    if (localStorage.getItem('token')) {
      const decoded = jwt_decode(localStorage.getItem('token'));
      return decoded;
    } else {
      return null;
    }
  }

}
