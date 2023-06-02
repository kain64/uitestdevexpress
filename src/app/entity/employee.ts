import {Task } from "./task";

export class Employee {


   id: string|undefined;
  /**
   * Employee First Name
   */


   firstName: string|undefined
  /**
   * Employee Last Name
   */


   lastName: string|undefined
  /**
   * Employee Position
   */


   position: string|undefined
  /**
   * Employee address
   */


   address: string|undefined
  /**
   * Employee phone
   */


   phone: string|undefined
  /**
   * Assigned tasks
   */
   tasks: Task[];

  /**
   * Assigned tasks
   */
   photo:any;


   employees:Employee[]|any;




  constructor(id: string, firstName: string, lastName: string, position: string, address: string, phone: string, tasks: any, photo: any, employees:Employee[]|any) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.position = position;
    this.address = address;
    this.phone = phone;
    this.tasks = tasks;
    this.photo = photo;
    this.employees = employees;
  }
}
