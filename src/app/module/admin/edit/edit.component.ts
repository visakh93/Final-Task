import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

constructor(private activeRouter:ActivatedRoute,private apiService:ApiService,private fb:FormBuilder){}

userId:any
StaffDetails:any;
employeeForm !: FormGroup;

newEmp:any={
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
fileName:any;
startDate = new Date(1990, 0, 1);
userJson = localStorage.getItem("EditUser");
  ngOnInit(){
    this.activeRouter.params.subscribe((params:any)=>{
      if(params.id == undefined){
      this.userId=params.id;
      }
      this.userId=params.id;
    })
    setTimeout(() => {
      
      
      this.apiService.getById(this.userId).subscribe((res)=>{
        this.newEmp= res;
this.fileName = this.newEmp.image;
        console.log(this.newEmp);
        
        this.employeeForm=this.fb.group({
          name:[this.newEmp.name,Validators.required],
          age:[this.newEmp.age,Validators.required],
          dob:[this.newEmp.dob,Validators.required],
          gender:[this.newEmp.gender,Validators.required],
          image:[''],
          blood:[this.newEmp.blood,Validators.required],
          role:[this.newEmp.role,Validators.required],
          email:[this.newEmp.email,Validators.compose([ Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
          password:[this.newEmp.password,Validators.compose([Validators.required,Validators.pattern("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16})")])],
          mobile:[this.newEmp.mobile,Validators.compose( [Validators.required,Validators.pattern("[0-9]{10}")])],
           pin:[this.newEmp.pin,Validators.compose( [Validators.required,Validators.pattern("[0-9]{6}")])],
         })
  
})
}, 0);

  }
  seletctedFile!:File;
uploadFile(event:any){
this.seletctedFile =<File> event.target.files[0];
console.log('selected file:', this.seletctedFile.name);
this.newEmp.image = this.seletctedFile.name
}

  onSave(empForm:FormGroup){
    this.newEmp = empForm.value;
    this.newEmp.dob= formatDate(empForm.value.dob, 'dd-MM-yyyy', 'en')

    if(this.seletctedFile!= undefined){
    this.newEmp.image= this.seletctedFile.name
  }else{
    this.newEmp.image= this.fileName
  }
console.log(this.newEmp);

    this.apiService.getPatch(this.userId,this.newEmp).subscribe((res:any)=>{
        console.log('Patch ',res);
        
        alert("update Successful")
    })
}
}
