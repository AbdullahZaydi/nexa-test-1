import { TaskStatus, TaskType, IConstants } from '../types';

const constants: IConstants = {
  TASK_STATUS: TaskStatus,
  TASK_TYPES: TaskType,
  STORAGE_PATH: './store/tasks.json',
  PROCESSING_TIME: {
    MIN: 2000, // 2 seconds
    MAX: 5000  // 5 seconds
  }
};

export default constants;
export { TaskStatus, TaskType };

