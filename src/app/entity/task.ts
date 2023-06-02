import {v4 as uuidv4} from 'uuid';
export class Task {
  /**
   * task unique id
   */
   id:string = uuidv4();
  /**
   * Task description
   */
   description:string;
  /**
   * Creation date
   */
   creationDate:Date;
  /**
   * Date finish date
   */
   finishDate:Date;

  /**
   * real date finish date
   */
   realFinishDate:Date;
  /**
   * current task status
   */

   status:string;



  constructor(id: string|any, description: string, creationDate: Date, finishDate: Date|any, reaCreationDate: Date|any, status: string) {
    this.id = id;
    this.description = description;
    this.creationDate = creationDate;
    this.finishDate = finishDate;
    this.realFinishDate = reaCreationDate;
    this.status = status;
  }
}
