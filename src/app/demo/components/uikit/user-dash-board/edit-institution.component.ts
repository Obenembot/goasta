import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {debounceTime} from 'rxjs/operators';
import swal from "sweetalert2";
import {InstitutionsService} from "../institutions/shared/institutions.service";
import {Institution} from "./models/institution";

@Component({
    selector: 'app-edit-institution',

    templateUrl: './edit-institution.component.html',
    styleUrl: './institution.component.scss'
})
export class EditInstitutionComponent {
    breadCrumbItems: MenuItem[];
    home: MenuItem;
    isLoading = false;
    formIsInvalid = false;
    form: FormGroup;
    id: any;
    process: any;

    constructor(private formBuilder: FormBuilder, activatedRoute: ActivatedRoute, fb: FormBuilder, private router: Router,
                private institutionsService: InstitutionsService) {
        this.form = this.formBuilder.group({
            id: [null],
            registrationNumber: [null, [Validators.required]],
            name: [null, [Validators.required]],
            address: [null, [Validators.required]],
            url: [null, [Validators.required]],
            email: [null, [Validators.required]],
            phoneNumber: [null, [Validators.required]],
            createdBy: [null],
            createdDate: [new Date()],
            lastModifiedBy: [null],
            activated: [null],
            lastModifiedDate: [new Date()],
        });

        this.id = activatedRoute.snapshot.params['id'];

        if (!this.id) {
            this.breadCrumbItems = [
                {label: 'Home'},
                {label: 'Manage Institution', routerLink: '../list-institutions'},
            ];
            this.home = {icon: 'pi pi-home'};
            this.process = 'Create Institution';
        } else {
            this.breadCrumbItems = [
                {label: 'Home'},
                {label: 'Manage Institution', routerLink: '../../list-institutions'},
            ];
            this.home = {icon: 'pi pi-home'};
            this.process = 'Edit Institution';
        }

    }

    initInstitution(id: number) {
        if (id && id > 0) {
            this.institutionsService.getInstitutionById(this.id).pipe(debounceTime(500)).subscribe((institutions: Institution) => {
                this.form.patchValue(institutions);
            });
        }

    }

    ngOnInit(): void {
        this.initInstitution(this.id);
    }

    routeToList(): void {
        this.router.navigate(['/uikit/user-dash-board/institution']);
    }

    checkForm(form: FormGroup) {
        if (!this.form.valid) {
            this.form.controls['id'].markAsTouched();
            this.form.controls['registrationNumber'].markAsTouched();
            this.form.controls['name'].markAsTouched();
            this.form.controls['address'].markAsTouched();
            this.form.controls['url'].markAsTouched();
            this.form.controls['email'].markAsTouched();
            this.form.controls['phoneNumber'].markAsTouched();
            this.formIsInvalid = true;
        } else {
            this.isLoading = true;
            this.formIsInvalid = false;
            this.submit();
        }
    }

    submit() {
        this.form.controls['lastModifiedDate'].patchValue(new Date());
        if (this.id && this.id > 0) {
            this.institutionsService.updateInstitution(this.form.value).pipe(debounceTime(500)).subscribe((response) => {
                this.form.patchValue(response);
                this.showSuccess("Updated Institution!");
            }, error => {
                this.showFailed(JSON.parse(error).error.text);
            })
        } else {
            this.institutionsService.saveInstitution(this.form.value).pipe(debounceTime(500)).subscribe((response) => {
                this.form.patchValue(response);
                this.showSuccess("Created Institution!");
            }, error => {
                this.showFailed(JSON.parse(error).error.text);
            })
        }
    }

    showSuccess(message: string) {
        swal.fire({
            title: `Successfully  ${message}`,
            text: `${message}`,
            icon: 'success',
            target: 'body',
            confirmButtonText: 'OK',
        }).then(() => {
            this.isLoading = false;
            this.routeToList();
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
            this.isLoading = false;
            this.routeToList();
        });
    }

}
