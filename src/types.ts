export type Factory<T> = () => T;
export type Value<T> = { value: T };
export type Task<Y = any, R = any> = Generator<Y, R>;