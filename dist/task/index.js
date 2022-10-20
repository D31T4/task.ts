"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty = exports.compress = exports.parallel = exports.serial = exports.runToEnd = exports.run = void 0;
/**
 * wraps a generator function with the return value of `task` returned as reference
 * @param task inner generator
 * @param out output ref
 * @returns an generator that wraps the current one.
 */
function* run(task, out) {
    while (true) {
        const { value, done } = task.next();
        if (!done) {
            yield value;
        }
        else {
            out.value = value;
            return;
        }
    }
}
exports.run = run;
/**
 * exhaust a generator and return
 * @param task generator
 * @returns return value of the generator
 */
function runToEnd(task) {
    const val = { value: undefined };
    for (const _ of run(task, val)) { }
    return val.value;
}
exports.runToEnd = runToEnd;
/**
 * join multiple generators in serial
 * @param args generators to be concatenated
 */
function* serial(...args) {
    for (const task of args) {
        const generator = typeof task === 'function' ?
            task() :
            task;
        yield* generator;
    }
}
exports.serial = serial;
/**
 * join multiple generators in parallel
 * @param args generators to be joined
 */
function* parallel(...args) {
    var _a;
    const tasks = args.map(task => {
        return typeof task === 'function' ?
            task() :
            task;
    });
    while (true) {
        let done = true;
        for (const task of tasks) {
            const result = task.next();
            const isDone = (_a = result.done) !== null && _a !== void 0 ? _a : true;
            if (!isDone)
                yield result.value;
            done && (done = isDone);
        }
        if (done)
            break;
    }
}
exports.parallel = parallel;
function* compress(task, compressionRatio) {
    let count = 0;
    while (true) {
        const { value, done } = task.next();
        if (done)
            return value;
        if (++count >= compressionRatio) {
            yield;
            count = 0;
        }
    }
}
exports.compress = compress;
/**creates an empty generator */
function* empty() { }
exports.empty = empty;
