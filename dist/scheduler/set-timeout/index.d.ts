import Scheduler from "../base";
import type { milliesecond } from '../../types';
/**
 * implements scheduler using `setTimeout`
 */
declare class TimeoutScheduler extends Scheduler {
    /**Interval to invoke `scheduledExecution` */
    protected readonly excutionInterval: milliesecond;
    /**Time window allocated for each scheduled execution */
    protected readonly executionWindow: milliesecond;
    constructor(options: TimeoutScheduler.Options);
    protected scheduleExecution(): void;
    protected runTasks(deadline: IdleDeadline): void;
}
declare namespace TimeoutScheduler {
    interface Options {
        executionInterval: milliesecond;
        executionWindow: milliesecond;
    }
}
export default TimeoutScheduler;
export declare class IdleDeadlineMock implements IdleDeadline {
    protected end: milliesecond;
    constructor(initialTimeRemaining: milliesecond);
    get didTimeout(): boolean;
    timeRemaining(): milliesecond;
}
