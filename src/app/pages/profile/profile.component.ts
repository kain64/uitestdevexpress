import {Component, Input} from '@angular/core';
import {EmployeesService} from "../../services/employees.service";
import {Employee} from "../../entity/employee";
import {Task} from "../../entity/task";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Report} from "../../entity/report";
import {RxStompService} from "../../services/rx-stomp.service";





@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent {
  @Input()employee: Employee|any|null={};
  isPopupVisible: boolean = false;
  colCountByScreen: object;
  currentSubEmployee: Employee|null = null;
  newUserInputDescription: string|any="";
  myMamager: Employee |any=null;
  myManagerLoaded: boolean = false;

  managerLabel:string|any="";
  popupValueHandler:any;


  private employeeService: EmployeesService;
  notesEditorOptions = { height: 90, maxLength: 200 };
  assignTask = (e:any)=>{
    this.currentSubEmployee = e.row.data;
    this.popupValueHandler = this.createTaskForCurrentUser;
    this.showTaskPopup();
  }
  hideTaskPopup=()=>{
    this.isPopupVisible = false;
  }
  showTaskPopup=()=>{
    this.isPopupVisible = true;
  }
  createTaskForCurrentUser = ()=>
  {
    const currentSubEmployeeNewTask = new Task(null, this.newUserInputDescription, new Date(),null,null,"OPEN")
    this.newUserInputDescription = "";
    this.employeeService.createTask(this.currentSubEmployee?.id, currentSubEmployeeNewTask);
    this.hideTaskPopup()
  };
  onNewTaskTextChanged= (event:any)=>{
    const value = (event.target as any).value
    this.newUserInputDescription = value;
  }
  private createReportForManager=(e:any)=>{
    const report = new Report("", this.newUserInputDescription, new Date(), this.employee);
    this.newUserInputDescription = "";
    this.employeeService.createReport(this.myMamager?.id, report, ()=>{});
    this.hideTaskPopup()
  }
  getReporterName= (rawData:any)=>{
    return rawData?.reporter?.firstName+" "+ rawData?.reporter?.lastName;
  }
  private stompClient: any;


  reportToManager() {
    this.popupValueHandler = this.createReportForManager;
    this.showTaskPopup();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.loadUser(params.get('id'));
    });
  }

  private loadUser=(id: string|any)=> {

    this.employeeService.getEmployee(id, (employee: Employee) => {
      this.employee = employee;
      this.myManagerLoaded =false;
      this.employeeService.getMyManager(employee.id, (employee: Employee) => {
        this.myMamager = employee;
        this.myManagerLoaded =true;
        this.managerLabel = this.myMamager?.firstName + " " + this.myMamager?.lastName
      });
    });
  }

  constructor(private route: ActivatedRoute,private http:HttpClient,private rxStompService: RxStompService) {

    this.rxStompService.watch('/all').subscribe((message: any) => {
      console.log(message);
      if(this.employee.id === message.body) {
        this.loadUser(message.body);
      }
    });


    this.employeeService = new EmployeesService(http)
    // @ts-ignore
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };

  }


}
