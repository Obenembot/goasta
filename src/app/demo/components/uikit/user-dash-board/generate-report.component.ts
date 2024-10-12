import {Component, OnInit} from '@angular/core';
import swal from "sweetalert2";
import {Router} from "@angular/router";
import {ReportService} from "./shared/report.service";

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
})
export class GenerateReportComponent implements OnInit {

  isLoading = false;

  constructor(protected reportService: ReportService, protected router: Router) {
  }

  ngOnInit(): void {
  }

  generateAndSendAllReports() {
    this.isLoading = true;
    this.reportService.generateAndSendAllReports().subscribe((report: any) => {
      this.isLoading = false;
      this.showSuccess("Generated and Sent Reports!")
    }, error => {
      this.isLoading = false;
      this.showFailed(error);
    })
  }

  routeToList(): void {
    this.router.navigate(['/payment']);
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
