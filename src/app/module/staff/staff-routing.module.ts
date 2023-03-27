import { LeadingComment } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from '../admin/edit/edit.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { LeaveUpdateComponent } from './leave-update/leave-update.component';

const routes: Routes = [
  {path:'',component:HomeComponent,
  runGuardsAndResolvers: 'always',
children:[
  {path:'',component:IndexComponent},
  {path:':id',component:IndexComponent},
  {path:'edit/:id',component:EditComponent},
  {path:'leaveUpdate/:id',component:LeaveUpdateComponent}

]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
