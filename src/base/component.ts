import { setActiveEffect } from '../reactive/base.ts';
import {ref} from "../reactive/ref.ts";
import {reactive} from "../reactive/reactive.ts";
import {computed} from "../reactive/computed.ts";

export function mapValues(obj: Record<string, unknown>) {
    return Object.entries(obj).reduce((acc: Record<string, unknown>, [key, value]) => {
        acc[key as keyof typeof acc] = (value as { value: unknown }).value;
        return acc;
    }, {});
}

export function component<
    Props extends { [K in keyof Props]: Props[K]},
    Refs extends { [K in keyof Refs]: Refs[K]},
    Reactives extends { [K in keyof Reactives]: Reactives[K]},
    Computes extends { [K in keyof Computes]: (props: Props & Refs & Reactives) => any}
>(componentDefinition: {
    template: (props: Props & Refs & Reactives & Computes) => string;
    refs?: Refs;
    reactives?: Reactives;
    computes?: Computes;
}) {
    return (props: Props, root: HTMLElement) => {
        let refs: Refs;
        let reactives: Reactives;
        let computes: Computes;

        const effect = () => {
            root.innerHTML = componentDefinition.template({
                ...props,
                ...mapValues(refs),
                ...mapValues(reactives),
                ...mapValues(computes),
            });
        };

        const reset = setActiveEffect(effect);
        refs = Object.entries(componentDefinition.refs || {}).reduce((acc: Record<string, unknown>, [key, value]) => {
            acc[key] = ref(value);
            return acc;
        }, {}) as Refs;
        reactives = Object.entries(componentDefinition.reactives || {}).reduce((acc: Record<string, unknown>, [key, value]) => {
            acc[key] = reactive(value as {});
            return acc;
        }, {}) as Reactives;
        computes = Object.entries(componentDefinition.computes || {}).reduce((acc: Record<string, unknown>, [key, value]) => {
            acc[key] = computed(value as () => unknown, props, refs, reactives);
            return acc;
        }, {}) as Computes;
        effect();
        reset();

        console.log(refs);
    }
}
