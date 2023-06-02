import {Component, Inject} from '@angular/core';
import {EmployeesService} from "../../services/employees.service";
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../../entity/employee";
@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  employees: Employee[]=[];
  component: any;
  constructor(private router: Router, private http: HttpClient) {
    this.employees = new EmployeesService(http).getEmployees((employees:any)=>{
        this.employees = employees;
    })
    this.component = this;
  }
  goToPage=(e:any)=>{
       this.router.navigate(['/profile',{id: e.row.data.id}]);
  }

}
