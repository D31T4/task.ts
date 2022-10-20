import { milliesecond } from "../../types";
import Scheduler from "../base";
/**
 * implements scheduler using `requestAnimationFrame`.
 */
declare class AnimationFrameScheduler extends Scheduler {
    protected readonly executionWindow: milliesecond;
    constructor(options: RequestAnimationFrameScheduler.Options);
    protected scheduleExecution(): void;
    /**run task(s) from task queue */
    protected runTasks(deadline: IdleDeadline): void;
}
declare namespace RequestAnimationFrameScheduler {
    interface Options {
        executionWindow: number;
    }
}
export default AnimationFrameScheduler;
