import {Injectable} from "@angular/core";
import {HttpClient, HttpContext} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../models/student.model";
import {environment} from "../../../../../../environments/environment";
import {AUTHORIZATION} from "../../../../service/http-interceptor/http-interceptor.service";

@Injectable({providedIn: 'root'})
export class StudentService {


    constructor(public http: HttpClient) {
    }

    getToken(): any {
        return window.localStorage.getItem('token');
    }

    saveStudent(student: Student): Observable<Student> {
        return this.http.post<Student>(environment.STUDENT_URL, student);
    }

    updateStudent(Student: Student): Observable<Student> {
        return this.http.put<Student>(environment.STUDENT_URL, Student);
    }

    getStudentById(id: number): Observable<Student> {
        return this.http.get<Student>(`${environment.STUDENT_URL}/${id}`);
    }

    getAllStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(`${environment.STUDENT_URL}`);
    }

    getStudentByName(courseName: string): Observable<Student> {
        return this.http.get<Student>(`${environment.STUDENT_URL}/name/${courseName}`);
    }

    deleteStudent(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.STUDENT_URL}/${id}`, {
            context: new HttpContext().set(AUTHORIZATION, `Bearer ${this.getToken()}`)
        });
    }


}
