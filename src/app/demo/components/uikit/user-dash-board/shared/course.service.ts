import {HttpClient, HttpContext} from "@angular/common/http";
import {Course} from "../models/course.model";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../../../../../environments/environment";
import {AUTHORIZATION} from "../../../../service/http-interceptor/http-interceptor.service";

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(public http: HttpClient) {
    }

    getToken(): any {
        return window.localStorage.getItem('token');
    }

    saveCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(environment.COURSE_URL, course, {
            context: new HttpContext().set(AUTHORIZATION, `Bearer ${this.getToken()}`)
        });
    }

    updateCourse(course: Course): Observable<Course> {
        return this.http.put<Course>(environment.COURSE_URL, course, {
            context: new HttpContext().set(AUTHORIZATION, `Bearer ${this.getToken()}`)
        });
    }

    getCourseById(id: number): Observable<Course> {
        return this.http.get<Course>(`${environment.COURSE_URL}/${id}`, {
            context: new HttpContext().set(AUTHORIZATION, `Bearer ${this.getToken()}`)
        })
    }

    getAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(`${environment.COURSE_URL}`, {
            context: new HttpContext().set(AUTHORIZATION, `Bearer ${this.getToken()}`)
        })
    }

    getCourseByName(courseName: string): Observable<Course> {
        return this.http.get<Course>(`${environment.COURSE_URL}/name/${courseName}`, {
            context: new HttpContext().set(AUTHORIZATION, `Bearer ${this.getToken()}`)
        })
    }

    deleteCourse(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.COURSE_URL}/${id}`, {
            context: new HttpContext().set(AUTHORIZATION, `Bearer ${this.getToken()}`)
        })
    }

}
