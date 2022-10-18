import type { Task, Factory, Value } from '../types';

/**
 * wraps a generator function with the return value of `task` returned as reference
 * @param task inner generator
 * @param out output ref
 * @returns an generator that wraps the current one.
 */
export function* run<Y, R>(task: Task<Y, R>, out: Value<R | void>): Task<Y, void> {
    while (true) {
        const { value, done } = task.next();

        if (!done) {
            yield value;
        } else {
            out.value = value;
            return;
        }
    }
}

/**
 * exhaust a generator and return
 * @param task generator
 * @returns return value of the generator
 */
export function runToEnd<R>(task: Task<any, R>): R | void {
    const val: Value<R | void> = { value: undefined };

    for (const _ of run(task, val)) {}
    
    return val.value;
}

/**
 * join multiple generators in serial
 * @param args generators to be concatenated
 */
export function* serial<Y>(...args: (Factory<Task<Y>> | Task<Y>)[]): Task<Y, void> {
    for (const task of args) {
        const generator = typeof task === 'function' ?
            task() :
            task;

        yield* generator;
    }
}

/**
 * join multiple generators in parallel
 * @param args generators to be joined
 */
export function* parallel<Y>(...args: (Factory<Task<Y>> | Task<Y>)[]): Task<Y, void> {
    const tasks = args.map<Task<Y>>(task => {
        return typeof task === 'function' ?
            task() :
            task;
    });

    while (true) {
        let done = true;

        for (const task of tasks) {
            const result = task.next();
            const isDone = result.done ?? true;

            if (!isDone)
                yield result.value;

            done &&= isDone;
        }
        
        if (done) break;
    }
}

/**creates an empty generator */
export function* empty(): Task<void, void> {}