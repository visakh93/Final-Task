import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, Output,OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit, OnChanges {



  chartBar:any
  chartDoughnut:any
  chartGuage:any;
value:any={}

  userData:any =[];
  leaveData:any=[];
  online=0;
  offline=0;
  totelEmpCount=0;
  checkDateDate=0
  weeklyCountArray:any=[];
  constructor(
    private apiService:ApiService,
   private datePipe:DatePipe,
    private el:ElementRef ){}
  ngOnInit(): void {

this.getdata();
// this.chartDoughnut ='{online:this.online,offline:this.offline}'

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getdata()
  }

  getdata(){
    
let today:any = new Date();
let current_week = this.datePipe.transform(today,'w')

  setTimeout(() => {
    
  
this.apiService.getAllUser().subscribe((response)=>{
  this.userData = response
  let leaveobj :any={
    name:'',
    leaveInWeek:0
  }
  for(let i =0;i<this.userData.length;i++){
    
    // ------- WORKING STATUS ---------
    
    this.totelEmpCount++;
    if(this.userData[i].status== true){
      this.online++;
    }else{
      this.offline++
    }
    
    // ----LEAVE DEA TAILS -------------
    let weeklyUpdate={ leaveCountByWeek: {
      "currentWeek":this.userData[i].leaveCountByWeek.currentWeek,
      "CurrentWeekLeave":this.userData[i].leaveCountByWeek.CurrentWeekLeave,
      "PreviousWeekLeave":this.userData[i].leaveCountByWeek.PreviousWeekLeave
    }
    }
   
    let previousWeek = this.userData[i].leaveCountByWeek.currentWeek
    console.log(previousWeek,'previoursd',current_week);
    
    let totelWeekCount = 0;
    if(previousWeek != current_week){
      weeklyUpdate.leaveCountByWeek.currentWeek=current_week;
      weeklyUpdate.leaveCountByWeek.PreviousWeekLeave += this.userData[i].leaveCountByWeek.CurrentWeekLeave
      weeklyUpdate.leaveCountByWeek.CurrentWeekLeave= 0
    }

let previousWeekcount = weeklyUpdate.leaveCountByWeek.PreviousWeekLeave;

console.log(this.userData[i].leaveCountByWeek.PreviousWeekLeave ,'previoous eace', previousWeekcount);

if(this.userData[i].leaveCountByWeek.PreviousWeekLeave != 0 ){
   leaveobj ={
  name:this.userData[i].name,
  leaveInWeek:previousWeekcount
}
this.weeklyCountArray.push(leaveobj)
}
this.apiService.getPatch(this.userData[i].id,weeklyUpdate).subscribe((res)=>{
  console.log('weekly leave update : ',res);
  
})

}
 this.chartBar = this.weeklyCountArray;


// PRODUCTIVE STATUS
this.chartDoughnut ={online:this.online,offline:this.offline}
let output=40000;
let hour =9;
let worked  = 18

let prodrtity = (this.totelEmpCount*540)/output* 100 ;
this.chartGuage = prodrtity   



console.log('checkDateDate : ',this.checkDateDate);

})
}, 0);
}






  // ----------- GET MULTY COROUSEL -------------

  getMultiCarousel() {
    let items = document.querySelectorAll('#chart .carousel-item');
    items.forEach((el) => {
			const minPerSlide = 2
			let next = el.nextElementSibling
			for (var i=1; i<minPerSlide; i++) {
				if (!next) {
            // wrap carousel by using first child
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.childNodes[0])
       
        next = next.nextElementSibling
    }
})


  }
}
