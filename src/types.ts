export type Factory<T> = () => T;

export type Value<T> = { value: T };

export type Task<Y = any, R = any> = Generator<Y, R>;

export type Action = () => void;

export type Constructor<T> = new (...args: any[]) => T;

export type uint = number;

export type milliesecond = number;