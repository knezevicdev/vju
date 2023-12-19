import {Dep} from "./base.ts";

export function reactive<T extends { [K in keyof T]: T[K] }>(obj: T) {
    const dep = new Dep();

    return new Proxy(obj, {
        get(target, key, receiver) {
            const result = Reflect.get(target, key, receiver);
            dep.depend();
            return result;
        },
        set(target, key, value, receiver) {
            const success = Reflect.set(target, key, value, receiver);
            if (success) {
                dep.notify();
            }
            return success;
        }
    });
}
