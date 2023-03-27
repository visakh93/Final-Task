import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'finalTask';
constructor(private apiService:ApiService){}
isLoading= this.apiService.isLoading;
progress= this.apiService.progress;
}
