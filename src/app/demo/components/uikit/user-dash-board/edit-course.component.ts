import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {debounceTime} from "rxjs/operators";
import swal from "sweetalert2";
import {CourseService} from "./shared/course.service";
import {Course} from "./models/course.model";

@Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html'
})
export class EditCourseComponent implements OnInit {

    breadCrumbItems: MenuItem[];
    home: MenuItem;
    isLoading = false;
    formIsInvalid = false;
    form: FormGroup;
    id: any;
    process: any;


    constructor(private formBuilder: FormBuilder, activatedRoute: ActivatedRoute, fb: FormBuilder, private router: Router,
                private courseService: CourseService) {
        this.form = this.formBuilder.group({
            id: [null],
            courseName: [null, [Validators.required]],
            description: [null, [Validators.required]],
            duration: [null, [Validators.required]],
            createdBy: [null],
            courseId: [0],
            createdDate: [new Date()],
            lastModifiedBy: [null],
            lastModifiedDate: [new Date()],
        });

        this.id = activatedRoute.snapshot.params['id'];

        if (!this.id) {
            this.breadCrumbItems = [
                {label: 'Home'},
                {label: 'Manage Course', routerLink: '../list-courses'},
            ];
            this.home = {icon: 'pi pi-home'};
            this.process = 'Create Course';
        } else {
            this.breadCrumbItems = [
                {label: 'Home'},
                {label: 'Manage Course', routerLink: '../../list-courses'},
            ];
            this.home = {icon: 'pi pi-home'};
            this.process = 'Edit Course';
        }

    }

    initCourse(id: number) {
        if (id && id > 0) {
            this.courseService.getCourseById(id).pipe(debounceTime(500)).subscribe((course: Course) => {
                this.form.patchValue(course);
            });
        }

    }

    ngOnInit(): void {
        this.initCourse(this.id);
    }

    routeToList(): void {
        this.router.navigate(['/uikit/user-dash-board/course']);
    }

    checkForm(form: FormGroup) {
        if (!this.form.valid) {
            this.form.controls['id'].markAsTouched();
            this.form.controls['name'].markAsTouched();
            this.form.controls['description'].markAsTouched();
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
            this.courseService.updateCourse(this.form.value).pipe(debounceTime(500)).subscribe((response) => {
                this.form.patchValue(response);
                this.showSuccess("Updated Course!");
            }, error => {
                this.showFailed(JSON.parse(error).error.text);
            })
        } else {
            this.courseService.saveCourse(this.form.value).pipe(debounceTime(500)).subscribe((response) => {
                this.form.patchValue(response);
                this.showSuccess("Created Course!");
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
