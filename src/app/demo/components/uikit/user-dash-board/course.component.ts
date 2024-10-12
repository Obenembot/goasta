import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";
import {CourseService} from "./shared/course.service";
import {Course} from "./models/course.model";


@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
})
export class CourseComponent {

    cols: any[] = [
        {field: 'id', header: 'ID', sortable: true},
        {field: 'courseName', header: 'Name', sortable: true},
        {field: 'description', header: 'Description', sortable: false},
        {field: 'duration', header: 'Duration', sortable: false},
        {field: 'createdBy', header: 'Created By', sortable: false},
        {field: 'createdDate', header: 'Created Date', sortable: false, type: 'date'},
        {field: 'lastModifiedBy', header: 'Last Modified By', sortable: false},
        {field: 'lastModifiedDate', header: 'Last Modified Date', sortable: false, type: 'date'},
        {field: 'activated', header: 'Activated', sortable: false},
    ];

    breadCrumbItems: MenuItem[];
    home: MenuItem;
    isLoading = false;
    total: number = 0;
    list: any[] = [];

    constructor(private courseService: CourseService) {
        this.breadCrumbItems = [
            {label: 'Home'},
            {label: 'Manage Students'},
        ];
        this.home = {icon: 'pi pi-home', routerLink: '../login'};
    }

    initBreadcrumbs(): void {
        this.breadCrumbItems = [
            {label: 'Home'},
            {label: 'Manage Courses'},
        ];
        this.home = {icon: 'pi pi-home', routerLink: '../login'};

    }

    initCourse() {
        this.isLoading = true;
        this.courseService.getAllCourses().subscribe((courses: Course[]) => {
            this.list = courses;
            this.isLoading = false;
        });
    }

    ngOnInit(): void {
        this.initBreadcrumbs();
        this.initCourse();
    }

    update(item: any) {
        this.isLoading = true;
        if (item.activated) {
            item.activated = false;
        } else {
            item.activated = true;
        }
        this.courseService.updateCourse(item).subscribe(res => {
            this.isLoading = false;
            this.initCourse();
        });
    }

}
