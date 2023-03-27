import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewComponent } from './add-new/add-new.component';
import { AllStaffComponent } from './all-staff/all-staff.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';

import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {path:'',component:HomeComponent,
  children:[
    {path:'',component:IndexComponent},
    {path:'addStaff',component:AddNewComponent},
    {path:'edit/:id',component:EditComponent},
    {path:'getAllStaff',component:AllStaffComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
