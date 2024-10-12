import {Component} from '@angular/core';
import swal from "sweetalert2";
import {MenuItem} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "./models/course.model";
import {CourseService} from "./shared/course.service";
import {StudentService} from "./shared/student.service";
import {debounceTime} from "rxjs";

@Component({
    selector: 'app-edit-student',
    templateUrl: './edit-student.component.html',
})
export class EditStudentComponent {

    breadCrumbItems: MenuItem[];
    home: MenuItem;
    isLoading = false;
    formIsInvalid = false;
    form: FormGroup;
    id: any;
    process: any;
    courses: Course[] = [];

    constructor(private formBuilder: FormBuilder, activatedRoute: ActivatedRoute, fb: FormBuilder, private router: Router,
                private courseService: CourseService, private studentService: StudentService) {
        this.form = this.formBuilder.group({
            id: [null],
            firstName: [null, [Validators.required]],
            idNumber: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            dateOfBirth: [null],
            phoneNumber: [null, [Validators.required]],
            courses: [[], [Validators.required]],
            studentId: [0],
            payments: [[]],
            createdBy: [null],
            activated: [true,],
            completedFees: [false]
        });

        this.id = activatedRoute.snapshot.params['id'];
        console.log('id', this.id);
        if (!this.id) {
            this.breadCrumbItems = [
                {label: 'Home'},
                {label: 'Manage Students', routerLink: '../list-students'},
            ];
            this.home = {icon: 'pi pi-home'};
            this.process = 'Create Student';
        } else {
            this.breadCrumbItems = [
                {label: 'Home'},
                {label: 'Manage Students', routerLink: '../../list-students'},
            ];
            this.home = {icon: 'pi pi-home'};
            this.process = 'Edit Student';
        }

    }


    ngOnInit(): void {
        this.initCourses();
        this.populateStudent(this.id);
    }

    populateStudent(id: number) {
        this.isLoading = true;
        if (id) {
            this.studentService.getStudentById(id).subscribe((res: any) => {
                this.form.patchValue(res);
                this.isLoading = false;
            });
        } else {
            this.isLoading = false;
        }
    }

    initCourses() {
        this.courseService.getAllCourses().pipe(debounceTime(700)).subscribe((courses) => {
            this.courses = courses;
        });
    }

    routeToList(): void {
        this.router.navigate(['/uikit/user-dash-board/student']);
    }

    checkForm(form: FormGroup) {
        if (!form.valid) {
            this.form.controls['firstName'].markAsTouched();
            this.form.controls['idNumber'].markAsTouched();
            this.form.controls['lastName'].markAsTouched();
            this.form.controls['email'].markAsTouched();
            this.form.controls['phoneNumber'].markAsTouched();
            this.form.controls['courses'].markAsTouched();
            this.formIsInvalid = true;
            console.log('not valid');
        } else {
            console.log('valid valid valid');
            this.isLoading = true;
            this.formIsInvalid = false;
            this.submit();
        }
    }

    submit() {
        this.isLoading = true
        if (!this.id && this.id > 0) {
            this.form.controls['createdBy'].patchValue("" + window.localStorage.getItem('encoded_username'));
            this.studentService.saveStudent(this.form.value).subscribe(res => {
                this.isLoading = false;
                this.form.patchValue(res);
                this.showSuccess("Created!");
            }, error => {
                this.isLoading = false;
                this.showFailed(error);
            })
        } else {
            this.form.controls['id'].patchValue(this.id);
            this.studentService.updateStudent(this.form.value).subscribe((res: any) => {
                this.isLoading = false;
                this.showSuccess("Updated!!")
            }, error => {
                this.isLoading = false;
                this.showFailed(error);
            })
        }
    }


    showSuccess(message: string) {
        swal.fire({
            title: 'Success!',
            text: `Student Successfully ${message}`,
            icon: 'success',
            target: 'body',
            confirmButtonText: 'OK',
        }).then(() => {
            this.router.navigate(['/uikit/user-dash-board/student']);
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
            // this.router.navigate(['/uikit/user-dash-board/institution']);
        });
    }
}
