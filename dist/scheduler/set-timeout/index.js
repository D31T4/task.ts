"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdleDeadlineMock = void 0;
const base_1 = __importDefault(require("../base"));
/**
 * implements scheduler using `setTimeout`
 */
class TimeoutScheduler extends base_1.default {
    constructor(options) {
        super();
        this.excutionInterval = options.executionInterval;
        this.executionWindow = options.executionWindow;
    }
    scheduleExecution() {
        setTimeout(() => {
            this.scheduledExecution(new IdleDeadlineMock(this.executionWindow));
        }, this.excutionInterval);
    }
    runTasks(deadline) {
        while (this.taskQueue.size > 0 && deadline.timeRemaining() > 0)
            this.runOneTask();
    }
}
exports.default = TimeoutScheduler;
class IdleDeadlineMock {
    constructor(initialTimeRemaining) {
        this.end = performance.now() + initialTimeRemaining;
    }
    get didTimeout() {
        return performance.now() >= this.end;
    }
    timeRemaining() {
        return this.end - performance.now();
    }
}
exports.IdleDeadlineMock = IdleDeadlineMock;
