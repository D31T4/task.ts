import '@d31t4/linq.ts';
import type { Task, Action, uint, Factory } from '../types';
import KeyGenerator from '../utils/key-generator';
import { GeneratorFunction } from '../utils/generator-function';

export enum SchedulerState {
    busy,
    idle
};

export type ScheduledTask = Action | Iterator<any>;

abstract class Scheduler {
    protected readonly taskQueue: Map<uint, ScheduledTask> = new Map();

    protected readonly keyGenerator: KeyGenerator = new KeyGenerator();

    protected _state: SchedulerState = SchedulerState.idle;

    public get state(): SchedulerState {
        return this._state;
    }

    public get pendingTasks(): uint {
        return this.taskQueue.size;
    }

    /**
     * queue a task
     * @param task task to be queued
     * @returns key of queued task
     */
    public queueTask(task: Action | Factory<Task> | Task): uint {
        let pendingTask: ScheduledTask = task;
        
        if (typeof task === 'function' && task instanceof GeneratorFunction)
            pendingTask = task() as Task;

        const key = this.keyGenerator.generateKey();
        this.taskQueue.set(key, pendingTask);

        if (this._state === SchedulerState.idle) {
            this._state = SchedulerState.busy;
            this.scheduleExecution();
        }

        return key;
    }

    /**
     * try dequeue task by key
     * @param key key of task
     * @returns true if dequeue is successful. false if task is already ran or not in task queue.
     */
    public tryDequeueTask(key: uint): boolean {
        return this.taskQueue.delete(key);
    }

    /**schedule calling next `scheduledExecution` */
    protected abstract scheduleExecution(): void;

    /**
     * run the first task from task queue
     */
    protected runOneTask(): void {
        const entry = this.taskQueue.toEnumerable().first();
        if (!entry) return;

        if (typeof entry[1] === 'function') {
            try {
                entry[1]();
            } catch (error) {
                console.error(error);
            }

            this.taskQueue.delete(entry[0]);
        } else {
            try {
                // task is an iterator. dont dequeue until done
                entry[1].next().done && this.taskQueue.delete(entry[0]);
            } catch (error) {
                // dequeue task when task throws an error
                this.taskQueue.delete(entry[0]);
                console.error(error);
            }
        }
    }

    /**execute queued tasks */
    protected abstract runTasks(...args: any[]): void;

    /**
     * run task(s) from task queue
     */
     protected scheduledExecution(...args: any[]): void {
        this.runTasks.apply(this, args);

        if (this.taskQueue.size) {
            this.scheduleExecution();
        } else {
            this._state = SchedulerState.idle;
        }
    }
}

export default Scheduler;