import type { Task, Factory, Value, uint } from '../types';
/**
 * wraps a generator function with the return value of `task` returned as reference
 * @param task inner generator
 * @param out output ref
 * @returns an generator that wraps the current one.
 */
export declare function run<Y, R>(task: Task<Y, R>, out: Value<R | void>): Task<Y, void>;
/**
 * exhaust a generator and return
 * @param task generator
 * @returns return value of the generator
 */
export declare function runToEnd<R>(task: Task<any, R>): R | void;
/**
 * join multiple generators in serial
 * @param args generators to be concatenated
 */
export declare function serial<Y>(...args: (Factory<Task<Y>> | Task<Y>)[]): Task<Y, void>;
/**
 * join multiple generators in parallel
 * @param args generators to be joined
 */
export declare function parallel<Y>(...args: (Factory<Task<Y>> | Task<Y>)[]): Task<Y, void>;
export declare function compress<R>(task: Task<any, R>, compressionRatio: uint): Task<void, R>;
/**creates an empty generator */
export declare function empty(): Task<void, void>;
