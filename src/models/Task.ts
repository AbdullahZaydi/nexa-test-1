import { v4 as uuidv4 } from 'uuid';
import { ITask, TaskStatus, TaskType } from '../types';

export class Task implements ITask {
  public id: string;
  public description: string;
  public type: TaskType;
  public status: TaskStatus;
  public createdAt: string;
  public startedAt: string | null;
  public completedAt: string | null;
  public response: ITask['response'];
  public processingTime: number | null;
  public error: string | null;

  constructor(description: string, type: TaskType = TaskType.GENERAL) {
    this.id = uuidv4();
    this.description = description;
    this.type = type;
    this.status = TaskStatus.PENDING;
    this.createdAt = new Date().toISOString();
    this.startedAt = null;
    this.completedAt = null;
    this.response = null;
    this.processingTime = null;
    this.error = null;
  }

  public toJSON(): ITask {
    return {
      id: this.id,
      description: this.description,
      type: this.type,
      status: this.status,
      createdAt: this.createdAt,
      startedAt: this.startedAt,
      completedAt: this.completedAt,
      response: this.response,
      processingTime: this.processingTime,
      error: this.error
    };
  }
}

