import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-all-staff',
  templateUrl: './all-staff.component.html',
  styleUrls: ['./all-staff.component.scss']
})
export class AllStaffComponent implements OnInit {

constructor(private apiService:ApiService){}
leaveColumns: string[] = ['count','leaveType', 'leaveCount', 'reason','leaveStart','leaveEnd','action'];
leaveSource:any;
workColumns: string[] = ['count','title', 'priority', 'desc','approved','target','action'];
workSource:any;
staffList:any=[];
workList:any=[];
leaveList:any = []


newWork:any={
  status:false,
  title:'',
  priority:'',
  desc:'',
  approved:'',
  target:''
}
showLeaveDeatails=false;
showWorkDeatails=false;


ngOnInit(): void {
    
    this.apiService.getAllUser().subscribe((response)=>{
      this.staffList = response
    })
  }

  showWorks(workList:any){
      this.workSource= workList
      this.showWorkDeatails=true
      
  }

  showLeave(leaveList:any){
 this.leaveSource= leaveList
 this.showLeaveDeatails=true;
 
  }

  closeWorks(){
    this.showWorkDeatails=false
  }
  closeLeave(){
    this.showLeaveDeatails=false;
  }


}
