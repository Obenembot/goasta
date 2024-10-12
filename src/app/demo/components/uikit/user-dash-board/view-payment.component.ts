import {Component} from '@angular/core';
import swal from "sweetalert2";
import {MenuItem} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {PaymentService} from "./shared/payment.service";

@Component({
    selector: 'app-view-payment',
    templateUrl: './view-payment.component.html',
})
export class ViewPaymentComponent {
    studentId: number = 0;
    list: any[] = [];
    breadCrumbItems: MenuItem[] = [];
    home: MenuItem;
    isLoading = false;
    total = 0;
    payments: any[] = [];

    cols: any[] = [
        {field: 'studentId', header: 'Student Id'},
        {field: 'depositAmount', header: 'Deposit Amount'},
        {field: 'paymentDate', header: 'Payment Date', type: 'date'},
        {field: 'amountToBePaid', header: 'Amount To Be Paid'},
        {field: 'outstandingAmount', header: 'Outstanding Amount'},
        {field: 'createdBy', header: 'Captured By'},
        {field: 'createdDate', header: 'Captured Date', type: 'date'},
        {field: 'lastModifiedBy', header: 'last Modified By', type: 'ignore'},
        {field: 'lastModifiedDate', header: 'Last Modified Date', type: 'date'},
    ]

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private paymentService: PaymentService) {
        this.studentId = this.activatedRoute.snapshot.params['id'];

        this.breadCrumbItems = [
            {label: 'Home'},
            {label: 'View Student Payments'},
        ];
        this.home = {icon: 'pi pi-home', routerLink: '../../payment'};


    }

    ngOnInit(): void {

        if (this.studentId && this.studentId > 0) {
            this.findPaymentByStudentId(this.studentId);
        }
    }

    findPaymentByStudentId(studentId: number) {
        if (studentId && studentId > 0) {
            this.isLoading = true;
            this.paymentService.findPaymentByStudentId(studentId).subscribe((response: any) => {
                this.payments = response;
                this.isLoading = false;
            }, (error: any) => {
                this.isLoading = false;
                this.showFailed(error);
            })
        } else {
            swal.fire({
                title: 'Info',
                text: `Please input a student id`,
                icon: 'info',
                target: 'body',
                confirmButtonText: 'OK',
            })
        }
    }

    showFailed(message: string) {
        swal.fire({
            title: 'Error',
            text: `${message}`,
            icon: 'error',
            target: 'body',
            confirmButtonText: 'OK',
        }).then(() => {
            this.router.navigate(['/user']);
        });
    }

}
