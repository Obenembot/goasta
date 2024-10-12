import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ListInstitionsComponent} from "./list/list.component";
import {EditInstitutionComponent} from "./edit/edit.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component: ListInstitionsComponent},
        {path: ':id', component: EditInstitutionComponent},
    ])],
    exports: [RouterModule]
})
export class InstitutionsRoutingModule {
}
