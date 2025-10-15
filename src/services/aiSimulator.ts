import queueService from './queueService';
import storageService from './storageService';
import constants, { TaskStatus } from '../config/constants';
import { 
  ITask, 
  IAIResponse, 
  ILeadAnalysisData, 
  ICallSummaryData, 
  IReportData, 
  IGeneralData 
} from '../types';

class AISimulator {
  private isRunning: boolean;

  constructor() {
    this.isRunning = false;
  }

  public start(): void {
    if (this.isRunning) {
      console.log('AI Simulator is already running');
      return;
    }

    this.isRunning = true;
    console.log('🤖 AI Simulator started');
    this.processQueue();
  }

  public stop(): void {
    this.isRunning = false;
    console.log('🛑 AI Simulator stopped');
  }

  private async processQueue(): Promise<void> {
    while (this.isRunning) {
      if (!queueService.isEmpty()) {
        const task = queueService.dequeue();
        
        if (task) {
          await this.processTask(task);
        }
      }
      
      // Small delay before checking queue again
      await this.sleep(500);
    }
  }

  private async processTask(task: ITask): Promise<void> {
    try {
      console.log(`🔄 Processing task ${task.id}: ${task.description}`);
      
      // Update task status to processing
      task.status = TaskStatus.PROCESSING;
      task.startedAt = new Date().toISOString();
      await storageService.updateTask(task.id, {
        status: task.status,
        startedAt: task.startedAt
      });

      // Simulate AI processing with random delay (2-5 seconds)
      const processingTime = this.getRandomProcessingTime();
      await this.sleep(processingTime);

      // Generate AI response
      const response = this.generateResponse(task);

      // Update task with completion
      task.status = TaskStatus.COMPLETED;
      task.completedAt = new Date().toISOString();
      task.response = response;
      task.processingTime = processingTime;

      await storageService.updateTask(task.id, {
        status: task.status,
        completedAt: task.completedAt,
        response: task.response,
        processingTime: task.processingTime
      });

      console.log(`✅ Task ${task.id} completed in ${processingTime}ms`);
    } catch (error) {
      console.error(`❌ Error processing task ${task.id}:`, error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      task.status = TaskStatus.FAILED;
      task.error = errorMessage;
      
      await storageService.updateTask(task.id, {
        status: task.status,
        error: task.error
      });
    }
  }

  private generateResponse(task: ITask): IAIResponse {
    const description = task.description.toLowerCase();
    
    // Simulate intelligent responses based on task type
    if (description.includes('lead') || description.includes('analyze')) {
      return this.generateLeadAnalysis();
    } else if (description.includes('call') || description.includes('summarize')) {
      return this.generateCallSummary();
    } else if (description.includes('report') || description.includes('update')) {
      return this.generateReportUpdate();
    } else {
      return this.generateGeneralResponse();
    }
  }

  private generateLeadAnalysis(): IAIResponse {
    const data: ILeadAnalysisData = {
      totalLeads: Math.floor(Math.random() * 100) + 50,
      qualifiedLeads: Math.floor(Math.random() * 50) + 20,
      topSources: ['LinkedIn', 'Website', 'Referral'],
      conversionRate: `${(Math.random() * 30 + 10).toFixed(2)}%`,
      recommendations: [
        'Focus on LinkedIn campaigns',
        'Increase follow-up frequency',
        'Segment leads by industry'
      ]
    };

    return {
      summary: 'Lead Analysis Complete',
      data,
      confidence: 0.92
    };
  }

  private generateCallSummary(): IAIResponse {
    const data: ICallSummaryData = {
      totalCalls: Math.floor(Math.random() * 50) + 10,
      averageDuration: `${Math.floor(Math.random() * 20) + 5} minutes`,
      keyTopics: ['Product Demo', 'Pricing Discussion', 'Technical Questions'],
      sentimentAnalysis: {
        positive: `${Math.floor(Math.random() * 40) + 50}%`,
        neutral: `${Math.floor(Math.random() * 30) + 10}%`,
        negative: `${Math.floor(Math.random() * 20)}%`
      },
      actionItems: [
        'Send proposal to 3 prospects',
        'Schedule follow-up calls',
        'Prepare technical documentation'
      ]
    };

    return {
      summary: 'Call Summary Generated',
      data,
      confidence: 0.88
    };
  }

  private generateReportUpdate(): IAIResponse {
    const data: IReportData = {
      reportType: 'Monthly Performance',
      metricsUpdated: ['Revenue', 'Engagement', 'ROI', 'Customer Satisfaction'],
      highlights: [
        'Revenue increased by 23%',
        'Customer retention rate: 94%',
        'New features adopted by 67% of users'
      ],
      nextSteps: [
        'Present findings to stakeholders',
        'Schedule quarterly review',
        'Update forecasting models'
      ]
    };

    return {
      summary: 'Client Report Updated',
      data,
      confidence: 0.95
    };
  }

  private generateGeneralResponse(): IAIResponse {
    const data: IGeneralData = {
      taskType: 'General Processing',
      result: 'Task completed with standard parameters',
      insights: [
        'All data validated',
        'No anomalies detected',
        'Ready for next steps'
      ]
    };

    return {
      summary: 'Task Processed Successfully',
      data,
      confidence: 0.85
    };
  }

  private getRandomProcessingTime(): number {
    const { MIN, MAX } = constants.PROCESSING_TIME;
    return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default new AISimulator();

