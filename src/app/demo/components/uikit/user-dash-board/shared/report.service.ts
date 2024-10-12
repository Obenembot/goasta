import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class ReportService {
    constructor(protected http: HttpClient) {
    }


    generateAndSendAllReports(): Observable<any> {
        return this.http.get(`${environment.REPORT_URL}`);
    }

    generateStudentReport(studentId: number): any {
        return this.http.get(`${environment.REPORT_URL}/studentId/${studentId}/format/pdf`)
    }
}
