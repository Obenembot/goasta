import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {AUTHORIZATION} from "../../../../service/http-interceptor/http-interceptor.service";
import {Institution} from "../models/institution";

@Injectable({
  providedIn: 'root'
})
export class InstitutionsService {

  constructor(private http: HttpClient) { }

  getToken(): any {
    return window.localStorage.getItem('token');
  }

  getInstitutionById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.INSTITUTIONS_URL}/${id}`)
  }

  saveInstitution(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(environment.INSTITUTIONS_URL, institution, {
      context: new HttpContext().set(AUTHORIZATION, `Bearer ${this.getToken()}`)
    });
  }

  updateInstitution(institutions: Institution): Observable<Institution> {
    return this.http.put<Institution>(environment.INSTITUTIONS_URL, institutions, {
      context: new HttpContext().set(AUTHORIZATION, `Bearer ${this.getToken()}`)
    });
  }

  getAllInstitutions(): Observable<Institution[]> {
    return this.http.get<Institution[]>(`${environment.INSTITUTIONS_URL}`, {
      context: new HttpContext().set(AUTHORIZATION, `Bearer ${this.getToken()}`)
    })
  }

  deleteInstitution(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.INSTITUTIONS_URL}/${id}`, {
      context: new HttpContext().set(AUTHORIZATION, `Bearer ${this.getToken()}`)
    })
  }
}
