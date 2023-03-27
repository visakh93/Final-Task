import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})

export class AddNewComponent implements OnInit {
  employeeForm !: FormGroup;
  
startDate = new Date(2023, 0, 1);
  newEmp={
  name:'',
  age:'',
  email:'',
  blood:'',
  password:'',
  mobile:'',
  dob:'',
  image:'',
  gender:'',
  role:'',
  pin:'',
  address:''
  }
  submitted=false;
  showData=false;
  today = new Date();
  constructor(private fb:FormBuilder,
    private apiService :ApiService,
    private datePipe:DatePipe ){}

ngOnInit(){
  this.employeeForm=this.fb.group({
    name:['',Validators.required],
    age:['',Validators.required],
    dob:['',Validators.required],
    gender:['',Validators.required],
    image:[''],
    blood:['',Validators.required],
    role:['',Validators.required],
    email:['',Validators.compose([ Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
    password:['',Validators.compose([Validators.required,Validators.pattern("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16})")])],
    mobile:['',Validators.compose( [Validators.required,Validators.pattern("[0-9]{10}")])],
    pin:['',Validators.compose( [Validators.required,Validators.pattern("[0-9]{6}")])],
   })
}
// image upload 

seletctedFile!:File;
formData=new FormData();
uploadFile(event:any){
this.seletctedFile =<File> event.target.files[0];
}

  onSave(empForm:FormGroup){
   
let current_week = this.datePipe.transform(this.today,'w')
    if(empForm.valid){
      empForm.value.dob= formatDate(empForm.value.dob, 'dd-MM-yyyy', 'en')
      empForm.value.edit=true;
      empForm.value.leaveCountByWeek= {
        "currentWeek":current_week,
        "CurrentWeekLeave": 0,
        "PreviousWeekLeave": 0
      };
      
      empForm.value.payment=10000;
      empForm.value.leaveDetails=0
      empForm.value.image= this.seletctedFile.name
      empForm.value.work=[]
      empForm.value.leaveData=[]
      
      this.newEmp=empForm.value;
      
this.showData=true;
  }
}
  onReset(value:string){
this.showData=false;
if(value=='submit'){
  this.employeeForm.reset();
  this.apiService.getPost(this.newEmp).subscribe((res)=>{
    alert('submit Successful')
    this.employeeForm.reset()
  })
}
  }

  onReEdit(){
    this.showData=false;
  }

}
