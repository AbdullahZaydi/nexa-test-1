// Type definitions for the AI Assistant Module

export enum TaskStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum TaskType {
  ANALYZE_LEADS = 'analyze_leads',
  SUMMARIZE_CALLS = 'summarize_calls',
  UPDATE_REPORT = 'update_client_report',
  GENERAL = 'general'
}

export interface ITask {
  id: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  response: IAIResponse | null;
  processingTime: number | null;
  error: string | null;
}

export interface ITaskCreate {
  description: string;
  type: TaskType;
}

export interface IAIResponse {
  summary: string;
  data: IResponseData;
  confidence: number;
}

export interface IResponseData {
  [key: string]: string | number | string[] | Record<string, unknown> | ISentimentAnalysis;
}

export interface ISentimentAnalysis {
  positive: string;
  neutral: string;
  negative: string;
}

export interface ILeadAnalysisData extends IResponseData {
  totalLeads: number;
  qualifiedLeads: number;
  topSources: string[];
  conversionRate: string;
  recommendations: string[];
}

export interface ICallSummaryData extends IResponseData {
  totalCalls: number;
  averageDuration: string;
  keyTopics: string[];
  sentimentAnalysis: ISentimentAnalysis;
  actionItems: string[];
}

export interface IReportData extends IResponseData {
  reportType: string;
  metricsUpdated: string[];
  highlights: string[];
  nextSteps: string[];
}

export interface IGeneralData extends IResponseData {
  taskType: string;
  result: string;
  insights: string[];
}

export interface ITaskStats {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  inQueue: number;
}

export interface IQueueStatus {
  size: number;
  tasks: ITask[];
}

export interface IApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  details?: string;
  data?: T;
}

export interface ITaskResponse extends IApiResponse {
  task?: ITask;
}

export interface ITasksResponse extends IApiResponse {
  tasks?: ITask[];
}

export interface IStatsResponse extends IApiResponse {
  stats?: ITaskStats;
}

export interface IQueueStatusResponse extends IApiResponse {
  queue?: IQueueStatus;
}

export interface IConstants {
  TASK_STATUS: typeof TaskStatus;
  TASK_TYPES: typeof TaskType;
  STORAGE_PATH: string;
  PROCESSING_TIME: {
    MIN: number;
    MAX: number;
  };
}

