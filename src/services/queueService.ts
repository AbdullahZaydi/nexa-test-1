import { EventEmitter } from 'events';
import { ITask } from '../types';

class QueueService extends EventEmitter {
  private queue: ITask[];

  constructor() {
    super();
    this.queue = [];
  }

  public enqueue(task: ITask): ITask {
    this.queue.push(task);
    console.log(`Task ${task.id} added to queue. Queue length: ${this.queue.length}`);
    this.emit('taskAdded', task);
    return task;
  }

  public dequeue(): ITask | null {
    if (this.queue.length === 0) {
      return null;
    }
    const task = this.queue.shift();
    if (task) {
      console.log(`Task ${task.id} removed from queue. Remaining: ${this.queue.length}`);
    }
    return task || null;
  }

  public peek(): ITask | null {
    return this.queue[0] || null;
  }

  public getAll(): ITask[] {
    return [...this.queue];
  }

  public size(): number {
    return this.queue.length;
  }

  public isEmpty(): boolean {
    return this.queue.length === 0;
  }

  public clear(): void {
    this.queue = [];
  }
}

export default new QueueService();

