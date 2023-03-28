import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';


import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { ChartComponent } from './chart/chart.component';
import { AddNewComponent } from './add-new/add-new.component';
import { AllStaffComponent } from './all-staff/all-staff.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';


import { AdminRoutingModule } from './admin-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from  '@angular/material/sort' 
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from "ng2-charts";
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import{MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
 
    IndexComponent,
      ChartComponent,
      BarChartComponent,
      DoughnutChartComponent,
      GaugeChartComponent,
      AddNewComponent,
      EditProfileComponent,
      EditComponent,
      HomeComponent,
      AllStaffComponent,
      
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
      ReactiveFormsModule,
      MatListModule,
      NgChartsModule,
  ]

})
export class AdminModule { }
