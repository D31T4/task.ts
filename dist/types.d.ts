export declare type Factory<T> = () => T;
export declare type Value<T> = {
    value: T;
};
export declare type Task<Y = any, R = any> = Generator<Y, R>;
export declare type Action = () => void;
export declare type Constructor<T> = new (...args: any[]) => T;
export declare type uint = number;
export declare type milliesecond = number;
