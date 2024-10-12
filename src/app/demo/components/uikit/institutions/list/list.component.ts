import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Institutions } from '../shared/institutions.model';
import { InstitutionsService } from '../shared/institutions.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  // styleUrls: ['./list.component.scss']
})
export class ListInstitionsComponent implements OnInit {

  cols: any[] = [
    {field: 'id', header: 'ID', sortable: true},
    {field: 'name', header: 'Name', sortable: true},
    {field: 'registrationNumber', header: 'Registration Number', sortable: false},
    {field: 'address', header: 'Address', sortable: false},
    {field: 'url', header: 'Url', sortable: false},
    {field: 'email', header: 'Email', sortable: false},
    {field: 'phoneNumber', header: 'Phone Number', sortable: false},
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
  hasData =false;

  constructor(private institutionsService : InstitutionsService) {
    this.breadCrumbItems = [
      {label: 'Home'},
      {label: 'Manage Students'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '../login'};
  }

  initBreadcrumbs(): void {
    this.breadCrumbItems = [
      {label: 'Home'},
      {label: 'Manage Institutions'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '../login'};

  }

  initInstitution() {
    this.isLoading = true;
    this.institutionsService.getAllInstitutions().subscribe((institutions: Institutions[]) => {
      if (institutions){
        this.hasData = institutions.length > 0 ? true: false;
        this.list = institutions;
      }

      this.isLoading= false;
    });
  }

  ngOnInit(): void {
    this.initBreadcrumbs();
    this.initInstitution();
  }

  update(item: any) {
    this.isLoading = true;
    if (item.activated) {
      item.activated = false;
    } else {
      item.activated = true;
    }

    this.institutionsService.updateInstitution(item).subscribe(res => {
      this.isLoading = false;
      this.initInstitution();
    });
  }

}
