import Scheduler from "../base";
/**
 * implements scheduler using `requestIdleCallback`
 */
declare class IdleCallbackScheduler extends Scheduler {
    protected options?: IdleRequestOptions;
    constructor(options?: IdleRequestOptions);
    protected scheduleExecution(): void;
    /**run task(s) from task queue */
    protected runTasks(deadline: IdleDeadline): void;
}
export default IdleCallbackScheduler;
