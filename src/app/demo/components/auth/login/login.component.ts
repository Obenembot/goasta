import {Component} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {MessageService} from "primeng/api";
import swal from "sweetalert2";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    public form: FormGroup;
    otpForm: FormGroup;
    verifyOtpForm: FormGroup;
    formIsInValid = false;
    isLoading = false;
    message = "";
    showLoginWithOpt = false;
    isEmailValid = false;


    constructor(private formBuilder: FormBuilder, private messageService: MessageService, private router: Router,
                private loginService: LoginService, public layoutService: LayoutService,) {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    checkForm(form: FormGroup): void {
        if (!this.form.valid) {
            this.form.controls['username'].markAsTouched();
            this.form.controls['password'].markAsTouched();
            this.formIsInValid = true;
        } else {
            this.isLoading = true;
            this.formIsInValid = false;
            this.submit();
        }
    }

    submit() {
        this.loginService.authenticate(this.form.value).subscribe(response => {
            const token = response;
            window.localStorage.setItem('token', token.token);
            window.localStorage.setItem('encoded_username', this.form.get('username')?.value);
            window.localStorage.setItem('authenticated', 'yes');

            this.showSuccess1("Login")
        }, error => {
            this.isLoading = false
            console.log('errrrr',error)
            this.showWarning(error.error);
        })
    }

    showWarning(message: string): void {
        this.messageService.add({key: 'tl', severity:'info', summary: 'Info', detail: message});
    }


    showSuccess1(message: string) {
        swal.fire({
            title: 'Success!',
            text: `User Successfully Login`,
            icon: 'success',
            target: 'body',
            confirmButtonText: 'OK',
        }).then(() => {
            this.router.navigate([`/uikit/user-dash-board/institution`]).then(() => {
                window.location.reload();
            });
        });
    }

}
