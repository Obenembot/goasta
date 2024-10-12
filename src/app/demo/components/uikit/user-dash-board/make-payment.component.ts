import {Component} from '@angular/core';
import swal from "sweetalert2";
import {MenuItem} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PaymentService} from "./shared/payment.service";

@Component({
    selector: 'app-make-payment',
    templateUrl: './make-payment.component.html'
})
export class MakePaymentComponent {


    isLoading = false;
    breadCrumbItems: MenuItem[] = [];
    home: MenuItem;
    form: FormGroup
    formIsInvalid = false;

    constructor(private router: Router, private fb: FormBuilder, private paymentService: PaymentService) {
        this.form = this.fb.group({
            depositAmount: [null, [Validators.required]],
            studentId: [null, [Validators.required]],
            paymentDate: [null, [Validators.required]],
            outstandingAmount: [0, [Validators.required]]
        })
        this.breadCrumbItems = [
            {label: 'Home'},
            {label: 'Manage Payments'},
        ];
        this.home = {icon: 'pi pi-home', routerLink: '/'};
    }

    routeToList(): void {
        this.router.navigate(['/uikit/user-dash-board/view-payment', this.form?.value?.studentId ? this.form?.value?.studentId : 0]);
    }

    ngOnInit(): void {
    }

    checkForm(form: FormGroup) {
        if (!this.form.valid) {
            this.form.controls['depositAmount'].markAsTouched();
            this.form.controls['studentId'].markAsTouched();
            this.form.controls['paymentDate'].markAsTouched();
            this.form.controls['outstandingAmount'].markAsTouched();

            this.formIsInvalid = true;
        } else {

            this.formIsInvalid = false;
            this.isLoading = true;
            this.submit();
        }
    }

    submit() {
        this.isLoading = true;
        this.paymentService.makeDeposit(this.form.get('studentId')?.value, this.form.value).subscribe((response: any) => {
            this.isLoading = false;
            this.showSuccess("Made!");
        }, (error: any) => {
            this.isLoading = false;
            this.showFailed(error);
        })
    }

    showSuccess(message: string) {
        swal.fire({
            title: 'Success!',
            text: `Deposit Successfully ${message}`,
            icon: 'success',
            target: 'body',
            confirmButtonText: 'OK',
        }).then(() => {
            this.router.navigate(['/uikit/user-dash-board/view-payment', this.form.get('studentId')?.value]);
        });
    }

    showFailed(message: string) {
        swal.fire({
            title: 'Error',
            text: `${message}`,
            icon: 'error',
            target: 'body',
            confirmButtonText: 'OK',
        }).then(() => {

        });
    }

}
