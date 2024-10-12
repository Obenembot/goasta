import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";
import {StudentService} from "./shared/student.service";
import {Student} from "./models/student.model";

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
})
export class StudentComponent {
    cols: any[] = [
        {field: 'id', header: 'ID', sortable: true},
        {field: 'firstName', header: 'First Name', sortable: true},
        {field: 'lastName', header: 'Last Name', sortable: false},
        {field: 'email', header: 'Email', sortable: true},
        {field: 'phoneNumber', header: 'Phone Number', sortable: false},
        {
            field: 'dateOfBirth', header: 'Date of Birth', sortable: false, type: 'date'
        },
        {field: 'studentId', header: 'Student Id', sortable: false,},
        {field: 'idNumber', header: 'Id Number', sortable: false,},
        {field: 'createdBy', header: 'Created By', sortable: false},
        {field: 'createdDate', header: 'Created Date', sortable: false, type: 'date'},
        {field: 'lastModifiedBy', header: 'Last Modified By', sortable: false},
        {field: 'lastModifiedDate', header: 'Last Modified Date', sortable: false, type: 'date'},
    ];

    breadCrumbItems: MenuItem[];
    home: MenuItem;
    isLoading = false;
    total: number = 0;
    students: Student[] = [];

    constructor(private studentService: StudentService) {
        this.breadCrumbItems = [
            {label: 'Home'},
            {label: 'Manage Students'},
        ];
        this.home = {icon: 'pi pi-home', routerLink: '../login'};
    }


    initStudents() {
        this.isLoading = true
        this.studentService.getAllStudents().subscribe((students) => {
            if (students) {
                this.students = students;
                this.total = students.length;
            }
            this.isLoading = false;
        });
    }

    ngOnInit(): void {
        this.initStudents();
    }

    update(item: any) {
        this.isLoading = true;
        if (item.activated) {
            item.activated = false;
        } else {
            item.activated = true;
        }
        this.studentService.updateStudent(item).subscribe(res => {
            this.isLoading = false;
            this.initStudents();
        });
    }

}
