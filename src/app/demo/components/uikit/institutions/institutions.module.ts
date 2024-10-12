import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from "primeng/table";
import {ListInstitionsComponent} from "./list/list.component";
import {HttpClientModule} from "@angular/common/http";
import {InstitutionsRoutingModule} from "./institutions-routing.module";
import {NgModule} from "@angular/core";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
    imports: [
        CommonModule,
        InstitutionsRoutingModule,
        FormsModule,
        TableModule,
        ReactiveFormsModule,
        HttpClientModule,
        InputTextModule
    ],
	declarations: [ListInstitionsComponent]
})
export class InstitutionsModule { }
