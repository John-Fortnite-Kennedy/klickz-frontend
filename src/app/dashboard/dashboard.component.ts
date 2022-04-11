import { Component, OnInit } from '@angular/core';
import { ApiCallerService } from '../api-caller.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private api: ApiCallerService) {
    this.api.myjwt =  sessionStorage.getItem('token');
    console.log(sessionStorage.getItem('token'));
    var response = this.api.sendGetRequestWithAuth("/auth/userdata")
    response.subscribe(data => {
      console.log(data['payload']);
    }, error => {
      // Add if login and password is incorrect.
      this.api.errorHandler(error.status);
    })
    
  }

  ngOnInit(): void {
  }

}
