import Scheduler from "../base";
import type { milliesecond } from '../../types';

/**
 * implements scheduler using `setTimeout`
 */
class TimeoutScheduler extends Scheduler {
    /**Interval to invoke `scheduledExecution` */
    protected readonly excutionInterval: milliesecond;

    /**Time window allocated for each scheduled execution */
    protected readonly executionWindow: milliesecond;

    public constructor(options: TimeoutScheduler.Options) {
        super();
        this.excutionInterval = options.executionInterval;
        this.executionWindow = options.executionWindow;
    }

    protected scheduleExecution(): void {
        setTimeout(() =>  {
            this.scheduledExecution(new IdleDeadlineMock(this.executionWindow));
        }, this.excutionInterval);
    }

    protected runTasks(deadline: IdleDeadline): void {
        while (this.taskQueue.size > 0 && deadline.timeRemaining() > 0)
            this.runOneTask();
    }
}

namespace TimeoutScheduler {
    export interface Options {
        executionInterval: milliesecond
        executionWindow: milliesecond
    }
}

export default TimeoutScheduler;

export class IdleDeadlineMock implements IdleDeadline {
    protected end: milliesecond;

    public constructor(initialTimeRemaining: milliesecond) {
        this.end = performance.now() + initialTimeRemaining;
    }

    public get didTimeout(): boolean {
        return performance.now() >= this.end;
    }

    public timeRemaining(): milliesecond {
        return this.end - performance.now();
    }
}