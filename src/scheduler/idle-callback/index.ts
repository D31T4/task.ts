import Scheduler from "../base";

/**
 * implements scheduler using `requestIdleCallback`
 */
class IdleCallbackScheduler extends Scheduler {
    protected options?: IdleRequestOptions

    public constructor(options?: IdleRequestOptions) {
        super();
        this.options = { ...options };
    }

    protected scheduleExecution(): void {
        globalThis.requestIdleCallback((deadline: IdleDeadline) => this.scheduledExecution(deadline), this.options);
    }

    /**run task(s) from task queue */
    protected runTasks(deadline: IdleDeadline): void {
        while (this.taskQueue.size > 0 && deadline.timeRemaining() > 0)
            this.runOneTask();
    }
}

export default IdleCallbackScheduler;