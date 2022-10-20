"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
const set_timeout_1 = require("../set-timeout");
/**
 * implements scheduler using `requestAnimationFrame`.
 */
class AnimationFrameScheduler extends base_1.default {
    constructor(options) {
        super();
        this.executionWindow = options.executionWindow;
    }
    scheduleExecution() {
        globalThis.requestAnimationFrame(() => {
            this.scheduledExecution(new set_timeout_1.IdleDeadlineMock(this.executionWindow));
        });
    }
    /**run task(s) from task queue */
    runTasks(deadline) {
        while (this.taskQueue.size > 0 && deadline.timeRemaining() > 0)
            this.runOneTask();
    }
}
exports.default = AnimationFrameScheduler;
