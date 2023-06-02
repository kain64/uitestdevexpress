import {Employee} from "../entity/employee";
import {Task} from "../entity/task";
import {HttpClient} from "@angular/common/http";
import {Router, UrlTree} from "@angular/router";
import {catchError, Observable} from "rxjs";
import {Report} from "../entity/report";

export class EmployeesService {

  constructor(private http: HttpClient) {
  }
  private getUrl(api:string):string{
    return "http://"+window.location.hostname+":8080/"+api
  }
  getEmployee=(id:string|null, resultReader:any):any=>{
    this.http.get<Employee>(this.getUrl("employee/"+id)).subscribe(resultReader);
  }
  getEmployees=(resultReader:any):any =>{
    this.http.get<Employee[]>(this.getUrl("employee")).subscribe(resultReader);
  }

  createTask=(id: string | undefined, task: Task | null)=> {
    this.http.post(this.getUrl("employee/"+id+"/task"),task).subscribe();
  }


  getMyManager=(id: string | undefined,resultReader:any) =>{
    this.http.get<Employee[]>(this.getUrl("managers/employee/"+id)).subscribe(resultReader,error => {})
  }

  createReport=(id: any, report: Report, resultReader:any)=> {
    this.http.post<Employee[]>(this.getUrl("managers/"+id+"/report"), report).subscribe(resultReader,error => {})
  }

  createEmployee=(employee: Employee, resultReader:any) =>{
    this.http.post<Employee[]>(this.getUrl("employee"), employee).subscribe(resultReader);
  }
   updateUser=(employee: Employee, resultReader: (data: any) => void) =>{
    this.http.post<Employee[]>(this.getUrl("employee/")+employee.id, employee).subscribe(resultReader);
  }
}
