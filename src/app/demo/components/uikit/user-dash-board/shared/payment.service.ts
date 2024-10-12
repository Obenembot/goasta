import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class PaymentService {


  constructor(public http: HttpClient) {
  }

  makeDeposit(studentId: number, payment: any): any {

    return this.http.post<any>(`${environment.PAYMENT_URL}/${studentId}`, payment);
  }

  findPaymentByStudentId(studentId: number): any {
    return this.http.get<any>(`${environment.PAYMENT_URL}/${studentId}`);
  }
}
