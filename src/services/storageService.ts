import { promises as fs } from 'fs';
import path from 'path';
import constants from '../config/constants';
import { ITask } from '../types';

class StorageService {
  private storagePath: string;

  constructor() {
    this.storagePath = path.resolve(constants.STORAGE_PATH);
    this.ensureStorageFile();
  }

  private async ensureStorageFile(): Promise<void> {
    try {
      await fs.access(this.storagePath);
    } catch (error) {
      // File doesn't exist, create it with empty array
      await fs.writeFile(this.storagePath, JSON.stringify([], null, 2));
    }
  }

  public async getAllTasks(): Promise<ITask[]> {
    try {
      const data = await fs.readFile(this.storagePath, 'utf-8');
      return JSON.parse(data) as ITask[];
    } catch (error) {
      console.error('Error reading tasks:', error);
      return [];
    }
  }

  public async saveTask(task: ITask): Promise<ITask> {
    try {
      const tasks = await this.getAllTasks();
      tasks.push(task);
      await fs.writeFile(this.storagePath, JSON.stringify(tasks, null, 2));
      return task;
    } catch (error) {
      console.error('Error saving task:', error);
      throw error;
    }
  }

  public async updateTask(taskId: string, updates: Partial<ITask>): Promise<ITask> {
    try {
      const tasks = await this.getAllTasks();
      const taskIndex = tasks.findIndex((t: ITask) => t.id === taskId);
      
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }

      const existingTask = tasks[taskIndex];
      if (!existingTask) {
        throw new Error('Task not found');
      }

      tasks[taskIndex] = { ...existingTask, ...updates };
      await fs.writeFile(this.storagePath, JSON.stringify(tasks, null, 2));
      return tasks[taskIndex] as ITask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  public async getTaskById(taskId: string): Promise<ITask | null> {
    try {
      const tasks = await this.getAllTasks();
      return tasks.find((t: ITask) => t.id === taskId) || null;
    } catch (error) {
      console.error('Error getting task:', error);
      return null;
    }
  }
}

export default new StorageService();

