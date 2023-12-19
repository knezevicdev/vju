import {setActiveEffect} from "./base.ts";

export function effect(fn: () => void) {
    const effect = () => {
        fn();
    };

    const reset = setActiveEffect(effect);
    effect();
    reset();
}
