import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {RegisterRoutingModule} from "./register-routing.module";
import {StyleClassModule} from "primeng/styleclass";
import {DividerModule} from "primeng/divider";
import {ChartModule} from "primeng/chart";
import {PanelModule} from "primeng/panel";
import {DropdownModule} from "primeng/dropdown";



@NgModule({
  declarations: [],
  imports: [
      PasswordModule,
      InputTextModule,
      FormsModule,
      CommonModule,
      RegisterRoutingModule,
      DividerModule,
      StyleClassModule,
      ChartModule,
      PanelModule,
      ButtonModule,
      DropdownModule
  ]
})
export class RegisterModule { }
