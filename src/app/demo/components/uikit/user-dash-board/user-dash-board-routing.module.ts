import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UserDashBoardComponent} from "./user-dash-board.component";
import {InstitutionComponent} from "./institution.component";
import {EditInstitutionComponent} from "./edit-institution.component";
import {CourseComponent} from "./course.component";
import {EditCourseComponent} from "./edit-course.component";
import {EditStudentComponent} from "./edit-student.component";
import {StudentComponent} from "./student.component";
import {EditUserComponent} from "./edit-user.component";
import {MakePaymentComponent} from "./make-payment.component";
import {ViewPaymentComponent} from "./view-payment.component";
import {GenerateReportComponent} from "./generate-report.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'admin', component: UserDashBoardComponent},
        {path: 'admin/:id', component: EditUserComponent},
        {path: 'institution', component: InstitutionComponent},
        {path: 'institution/:id', component: EditInstitutionComponent},
        {path: 'course', component: CourseComponent},
        {path: 'course/:id', component: EditCourseComponent},
        {path: 'student', component: StudentComponent},
        {path: 'student/:id', component: EditStudentComponent},
        {path: 'make-payment', component: MakePaymentComponent},
        {path: 'view-payment/:id', component: ViewPaymentComponent},
        {path: 'send-reports', component: GenerateReportComponent}
    ])],
    exports: [RouterModule]
})
export class UserDashBoardRoutingModule {
}
