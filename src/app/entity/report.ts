import {v4 as uuidv4} from "uuid";
import {Employee} from "./employee";

export class Report {
  /**
   * unique id
   */
  id:string = uuidv4();
  /**
   * description
   */
  description:string;
  /**
   * Creation date
   */
  creationDate:Date;

  /**
   * from
   */
  reporter:Employee;

  constructor(id: string|any, description: string, creationDate: Date, reporter:Employee) {
    this.id = id;
    this.description = description;
    this.creationDate = creationDate;
    this.reporter = reporter;
  }
}
