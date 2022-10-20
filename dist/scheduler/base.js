"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerState = void 0;
require("@d31t4/linq.ts");
const key_generator_1 = __importDefault(require("../utils/key-generator"));
const generator_function_1 = require("../utils/generator-function");
var SchedulerState;
(function (SchedulerState) {
    SchedulerState[SchedulerState["busy"] = 0] = "busy";
    SchedulerState[SchedulerState["idle"] = 1] = "idle";
})(SchedulerState = exports.SchedulerState || (exports.SchedulerState = {}));
;
class Scheduler {
    constructor() {
        this.taskQueue = new Map();
        this.keyGenerator = new key_generator_1.default();
        this._state = SchedulerState.idle;
    }
    get state() {
        return this._state;
    }
    get pendingTasks() {
        return this.taskQueue.size;
    }
    /**
     * queue a task
     * @param task task to be queued
     * @returns key of queued task
     */
    queueTask(task) {
        let pendingTask = task;
        if (typeof task === 'function' && task instanceof generator_function_1.GeneratorFunction)
            pendingTask = task();
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
    tryDequeueTask(key) {
        return this.taskQueue.delete(key);
    }
    /**
     * run the first task from task queue
     */
    runOneTask() {
        const entry = this.taskQueue.toEnumerable().first();
        if (!entry)
            return;
        if (typeof entry[1] === 'function') {
            try {
                entry[1]();
            }
            catch (error) {
                console.error(error);
            }
            this.taskQueue.delete(entry[0]);
        }
        else {
            try {
                // task is an iterator. dont dequeue until done
                entry[1].next().done && this.taskQueue.delete(entry[0]);
            }
            catch (error) {
                // dequeue task when task throws an error
                this.taskQueue.delete(entry[0]);
                console.error(error);
            }
        }
    }
    /**
     * run task(s) from task queue
     */
    scheduledExecution(...args) {
        this.runTasks.apply(this, args);
        if (this.taskQueue.size) {
            this.scheduleExecution();
        }
        else {
            this._state = SchedulerState.idle;
        }
    }
}
exports.default = Scheduler;
