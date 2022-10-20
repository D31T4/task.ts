import '@d31t4/linq.ts';
import type { Task, Action, uint, Factory } from '../types';
import KeyGenerator from '../utils/key-generator';
export declare enum SchedulerState {
    busy = 0,
    idle = 1
}
export declare type ScheduledTask = Action | Iterator<any>;
declare abstract class Scheduler {
    protected readonly taskQueue: Map<uint, ScheduledTask>;
    protected readonly keyGenerator: KeyGenerator;
    protected _state: SchedulerState;
    get state(): SchedulerState;
    get pendingTasks(): uint;
    /**
     * queue a task
     * @param task task to be queued
     * @returns key of queued task
     */
    queueTask(task: Action | Factory<Task> | Task): uint;
    /**
     * try dequeue task by key
     * @param key key of task
     * @returns true if dequeue is successful. false if task is already ran or not in task queue.
     */
    tryDequeueTask(key: uint): boolean;
    /**schedule calling next `scheduledExecution` */
    protected abstract scheduleExecution(): void;
    /**
     * run the first task from task queue
     */
    protected runOneTask(): void;
    /**execute queued tasks */
    protected abstract runTasks(...args: any[]): void;
    /**
     * run task(s) from task queue
     */
    protected scheduledExecution(...args: any[]): void;
}
export default Scheduler;
