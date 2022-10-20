import { milliesecond } from "../../types";
import Scheduler from "../base";
import { IdleDeadlineMock } from "../set-timeout";

/**
 * implements scheduler using `requestAnimationFrame`.
 */
class AnimationFrameScheduler extends Scheduler {
    protected readonly executionWindow: milliesecond;

    public constructor(options: RequestAnimationFrameScheduler.Options) {
        super();
        this.executionWindow = options.executionWindow;
    }

    protected scheduleExecution(): void {
        globalThis.requestAnimationFrame(() => {
            this.scheduledExecution(new IdleDeadlineMock(this.executionWindow))
        });
    }

    /**run task(s) from task queue */
    protected runTasks(deadline: IdleDeadline): void {
        while (this.taskQueue.size > 0 && deadline.timeRemaining() > 0)
            this.runOneTask();
    }
}

namespace RequestAnimationFrameScheduler {
    export interface Options {
        executionWindow: number
    }
}

export default AnimationFrameScheduler;