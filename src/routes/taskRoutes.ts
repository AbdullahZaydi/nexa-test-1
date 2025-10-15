import { Router, Request, Response } from 'express';
import { Task } from '../models/Task';
import queueService from '../services/queueService';
import storageService from '../services/storageService';
import { ITaskCreate, TaskType, ITask } from '../types';

const router = Router();

// Submit a new task
router.post('/tasks', async (req: Request, res: Response): Promise<void> => {
  try {
    const { description, type } = req.body as Partial<ITaskCreate>;

    if (!description || !description.trim()) {
      res.status(400).json({ 
        error: 'Task description is required' 
      });
      return;
    }

    // Validate task type
    const taskType = type && Object.values(TaskType).includes(type) 
      ? type 
      : TaskType.GENERAL;

    // Create new task
    const task = new Task(description.trim(), taskType);
    
    // Save to storage
    await storageService.saveTask(task.toJSON());
    
    // Add to queue for processing
    queueService.enqueue(task.toJSON());

    res.status(201).json({
      success: true,
      message: 'Task submitted successfully',
      task: task.toJSON()
    });
  } catch (error) {
    console.error('Error submitting task:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      error: 'Failed to submit task',
      details: errorMessage
    });
  }
});

// Get all tasks
router.get('/tasks', async (_req: Request, res: Response): Promise<void> => {
  try {
    const tasks: ITask[] = await storageService.getAllTasks();
    res.json({
      success: true,
      tasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      error: 'Failed to fetch tasks',
      details: errorMessage
    });
  }
});

// Get task by ID
router.get('/tasks/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      res.status(400).json({ error: 'Task ID is required' });
      return;
    }
    const task: ITask | null = await storageService.getTaskById(taskId);
    
    if (!task) {
      res.status(404).json({ 
        error: 'Task not found' 
      });
      return;
    }

    res.json({
      success: true,
      task
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      error: 'Failed to fetch task',
      details: errorMessage
    });
  }
});

// Get queue status
router.get('/queue/status', (_req: Request, res: Response): void => {
  try {
    const queuedTasks: ITask[] = queueService.getAll();
    
    res.json({
      success: true,
      queue: {
        size: queueService.size(),
        tasks: queuedTasks
      }
    });
  } catch (error) {
    console.error('Error fetching queue status:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      error: 'Failed to fetch queue status',
      details: errorMessage
    });
  }
});

// Get statistics
router.get('/stats', async (_req: Request, res: Response): Promise<void> => {
  try {
    const allTasks: ITask[] = await storageService.getAllTasks();
    const queueSize: number = queueService.size();
    
    const stats = {
      total: allTasks.length,
      pending: allTasks.filter((t: ITask) => t.status === 'pending').length,
      processing: allTasks.filter((t: ITask) => t.status === 'processing').length,
      completed: allTasks.filter((t: ITask) => t.status === 'completed').length,
      failed: allTasks.filter((t: ITask) => t.status === 'failed').length,
      inQueue: queueSize
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      error: 'Failed to fetch statistics',
      details: errorMessage
    });
  }
});

export default router;

