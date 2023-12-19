type ActiveEffect = () => void;
let activeEffect: ActiveEffect | undefined = undefined;

export function setActiveEffect(effect: ActiveEffect) {
    const prevActiveEffect = activeEffect;
    activeEffect = effect;

    return () => {
        activeEffect = prevActiveEffect;
    }
}

export class Dep {
    subscribers: Set<Function>;

    constructor() {
        this.subscribers = new Set();
    }

    depend() {
        if (activeEffect) {
            this.subscribers.add(activeEffect);
        }
    }

    notify() {
        this.subscribers.forEach(sub => sub());
    }
}
