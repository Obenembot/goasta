import {Injectable} from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {Observable} from "rxjs";
import {Login} from "./login.model";
import {environment} from "../../../../../environments/environment";
import {AUTHORIZATION} from "../../../service/http-interceptor/http-interceptor.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService {


    constructor(public http: HttpClient) {

    }

    authenticate(login: Login): Observable<any> {
        return this.http.post<any>(environment.LOGIN_URL, login,
            {
                context: new HttpContext().set(AUTHORIZATION, `Bearer `)
            });
    }

    authenticateWithOtp(otpDto: any): Observable<any> {
        return this.http.post<any>(`${environment.LOGIN_URL}/authenticate-with-otp`, otpDto,
            {
                context: new HttpContext().set(AUTHORIZATION, `Bearer `)
            });
    }

    verifyOtp(otp: number, email: string) {
        return this.http.get<any>(`${environment.LOGIN_URL}/verify-otp/${otp}/${email}`,
            {
                context: new HttpContext().set(AUTHORIZATION, `Bearer `)
            });
    }
}
