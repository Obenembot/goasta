import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserDashBoardRoutingModule} from './user-dash-board-routing.module';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {UserDashBoardComponent} from "./user-dash-board.component";
import {TableModule} from "primeng/table";
import {ToggleButtonModule} from "primeng/togglebutton";
import {InputTextModule} from "primeng/inputtext";
import {InstitutionComponent} from "./institution.component";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {EditInstitutionComponent} from "./edit-institution.component";
import {CourseComponent} from "./course.component";
import {EditCourseComponent} from "./edit-course.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {StudentComponent} from "./student.component";
import {EditStudentComponent} from "./edit-student.component";
import {MultiSelectModule} from "primeng/multiselect";
import {InputMaskModule} from "primeng/inputmask";
import {EditUserComponent} from "./edit-user.component";
import {PasswordModule} from "primeng/password";
import {MakePaymentComponent} from "./make-payment.component";
import {ViewPaymentComponent} from "./view-payment.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {PanelModule} from "primeng/panel";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {GenerateReportComponent} from "./generate-report.component";

@NgModule({
    imports: [
        CommonModule,
        UserDashBoardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TreeModule,
        TreeTableModule,
        TableModule,
        ToggleButtonModule,
        InputTextModule,
        BreadcrumbModule,
        ButtonModule,
        DialogModule,
        InputTextareaModule,
        MultiSelectModule,
        InputMaskModule,
        PasswordModule,
        ProgressSpinnerModule,
        PanelModule,
        InputNumberModule,
        CalendarModule
    ],
    declarations: [UserDashBoardComponent, EditUserComponent, InstitutionComponent, EditInstitutionComponent, CourseComponent,
        EditCourseComponent, StudentComponent, EditStudentComponent, MakePaymentComponent, ViewPaymentComponent, GenerateReportComponent],
})
export class UserDashBoardModule {
}
