import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";
import {UserService} from "./shared/user.service";

@Component({
    selector: 'app-user-dash-board',
    templateUrl: './user-dash-board.component.html',
    styleUrl: './user-dash-board.component.scss'
})
export class UserDashBoardComponent {
    cols: any[] = [
        {field: 'id', header: 'ID', sortable: true},
        {field: 'firstName', header: 'First Name', sortable: true},
        {field: 'lastName', header: 'Last Name', sortable: false},
        {field: 'email', header: 'Email', sortable: true},
        {field: 'phoneNumber', header: 'Phone Number', sortable: false},
        {
            field: 'dateOfBirth', header: 'Date of Birth', sortable: false, type: 'date'
        },
        {field: 'createdBy', header: 'Created By', sortable: false},
        {field: 'createdDate', header: 'Created Date', sortable: false, type: 'date'},
        {field: 'lastModifiedBy', header: 'Last Modified By', sortable: false},
        {field: 'lastModifiedDate', header: 'Last Modified Date', sortable: false, type: 'date'},
        {field: 'username', header: 'Username', sortable: true},
    ];

    breadCrumbItems: MenuItem[];
    home: MenuItem;
    isLoading = false;
    total: number = 0;
    list: any[] = [];

    constructor(private userService: UserService) {
        this.breadCrumbItems = [
            {label: 'Home'},
            {label: 'Manage Users'},
        ];
        this.home = {icon: 'pi pi-home', routerLink: '/auth/login'};
    }

    initUsers() {
        this.isLoading = true;
        this.userService.getAllUsers().subscribe(res => {
            if (res) {
                this.list = res;
                this.total = this.list.length;
            }
            this.isLoading = false;
        });
    }

    initBreadcrumbs(): void {
        this.breadCrumbItems = [
            {label: 'Home'},
            {label: 'Manage Users'},
        ];
        this.home = {icon: 'pi pi-home', routerLink: '/auth/login'};

    }

    ngOnInit(): void {
        this.initBreadcrumbs();
        this.initUsers();
    }

    update(item: any) {

        this.isLoading = true;
        if (item.enabled) {
            item.enabled = false;
        } else {
            item.enabled = true;
        }
        this.userService.updateUser(item).subscribe(res => {
            this.isLoading = false;
            this.initUsers();
        });
    }
}
