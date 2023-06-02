import {Component, ElementRef} from '@angular/core';
import 'devextreme/data/odata/store';
import {Employee} from "../../entity/employee";
import {EmployeesService} from "../../services/employees.service";
import {HttpClient} from "@angular/common/http";
import notify from 'devextreme/ui/notify';
import {Router} from "@angular/router";
@Component({
  templateUrl: 'employee.component.html'
})

export class EmployeeComponent {
  colCountByScreen: object;
  employee: Employee = new Employee("","","","","","", undefined,undefined, undefined);
  employees: any;
  selectedManager:Employee| any;

  private employeeService: EmployeesService;

  convertDataURIToBinary =(dataURI:any)=>{
    var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
    var base64 = dataURI.substring(base64Index);
    return base64;
  }
  changeListner=(event:any)=> {
    var reader = new FileReader();
    var image = this.element.nativeElement.querySelector('.image');
    const employee = this.employee;
    const employeeComponent = this;
    reader.onload = function(e) {
      var src = e?.target?.result;
      image.src = src;
      employee.photo=employeeComponent.convertDataURIToBinary(src);
    };

    reader.readAsDataURL(event?.target?.files[0]);
  }
  saveNewUser=()=> {
    if(this.selectedManager){
      this.employeeService.createEmployee(this.employee, (data:Employee)=>{
        if(!this.selectedManager.employees){
          this.selectedManager.employees=[]
        }
        this.selectedManager.employees.push(data);
        this.employeeService.updateUser(this.selectedManager, (data:any)=>{});

      });
    }else {
      this.employeeService.createEmployee(this.employee, (savedObject:any)=>{});
    }
    notify("New employee created:" + this.employee.lastName+" "+this.employee.firstName);
    this.router.navigate(['/home']);
  }
  displayManagerName=(item:any)=>{
    if(item) {
      return item.firstName + ' ' + item.lastName;
    }
    return "";
  }
  managerSelectionChanged=(event:any)=>{
    this.selectedManager = event.value;
  }

  constructor(private element: ElementRef, private http:HttpClient, private router: Router) {
    this.employeeService = new EmployeesService(http);
    this.employees = new EmployeesService(http).getEmployees((employees:any)=>{
      this.employees = employees;
    })
// @ts-ignore
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }




}
