"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
/**
 * implements scheduler using `requestIdleCallback`
 */
class IdleCallbackScheduler extends base_1.default {
    constructor(options) {
        super();
        this.options = Object.assign({}, options);
    }
    scheduleExecution() {
        globalThis.requestIdleCallback((deadline) => this.scheduledExecution(deadline), this.options);
    }
    /**run task(s) from task queue */
    runTasks(deadline) {
        while (this.taskQueue.size > 0 && deadline.timeRemaining() > 0)
            this.runOneTask();
    }
}
exports.default = IdleCallbackScheduler;
