import {Dep, setActiveEffect} from "./base.ts";
import {mapValues} from "../base/component.ts";

export function computed<T>(fn: (props: any) => T, props: any, refs: any, reactives: any) {
    let value: T;
    const dep = new Dep();

    const effect = () => {
        value = fn({
            ...props,
            ...mapValues(refs),
            ...mapValues(reactives),
        });
        dep.notify();
    };

    const reset = setActiveEffect(effect);
    effect();
    reset();

    return {
        get value() {
            dep.depend();
            return value;
        }
    }
}
