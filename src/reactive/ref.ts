import {Dep} from "./base.ts";

export function ref<T>(value: T) {
    const dep = new Dep();

    return {
        get value() {
            dep.depend();
            return value;
        },
        set value(newValue: T) {
            value = newValue;
            dep.notify();
        }
    }
}
