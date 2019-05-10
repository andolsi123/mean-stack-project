import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { AnimationStyleMetadata } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  connectedUser: any;

  constructor(private http: HttpClient) {
    this.connectedUser = this.getDecodedToken();
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

  postAddProject(body: any) {
    return this.http.post(`http://localhost:3000/projects/addProject`, body);
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
    // body = {companyEmail: company email, freelancer: freelancer name, notifications: notification with freelancer name};
    return this.http.post(`http://localhost:3000/projects/appliedFreelancers/${projectId}/${freelancerId}/${companyId}`, body);
  }

  postAffectedProject(freelancerId, projectId) {
    // body = {companyEmail: company email, freelancer: freelancer name, notifications: notification with freelancer name};
    return this.http.post(`http://localhost:3000/freelancers/addProjectApplied/${freelancerId}/${projectId}`,{});
  }

  postAcceptedFreelancer(projectId, freelancerId) {
    return this.http.post(`http://localhost:3000/projects/acceptedFreelancer/${projectId}/${freelancerId}`, null);
  }

  postRefusedFreelancer(freelancerId, projectId) {
    return this.http.post(`http://localhost:3000/freelancers/refusedFreelancer/${freelancerId}/${projectId}`, null);
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
    console.log(body)
    return this.http.post('http://localhost:3000/users/login', body);
  }

  getAllCompanies() {
    return this.http.get(`http://localhost:3000/companies/allCompanies`);
  }

  getAllFreelancers() {
    return this.http.get(`http://localhost:3000/freelancers/allfreelancers`);
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
    const header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(`http://localhost:3000/freelancers/updateFreelancerProfil/${id}`, body,  { headers: header });
  }

  UpdateFreelancerCv(id, body) {
    const header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(`http://localhost:3000/freelancers/updateFreelancerCv/${id}`, body,  { headers: header });
  }

  UpdateFreelancerLists(id, body) {
    const header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(`http://localhost:3000/freelancers/updateFreelancerLists/${id}`, body,  { headers: header });
  }

  postDeleteComment(idP: any, idC: any) {
    return this.http.post(`http://localhost:3000/projects/deleteComment/${idP}/${idC}`, null);
  }

  postUpdateComment(idP: any, idC: any){
    return this.http.post(`http://localhost:3000/projects/updateComment/${idP}/${idC}`, null);
  }

  postAddComment(id, body) {
    return this.http.post(`http://localhost:3000/projects/addComment/${id}`, body);
  }

  notificationRemove(companyId) {
    return this.http.post(`http://localhost:3000/projects/removeNotifications/${companyId}`, null);
  }

  postLikeProject(idP, idF) {
    return this.http.post(`http://localhost:3000/projects/addRemoveLike/${idP}/${idF}`, null);
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
