import {component} from "../base/component.ts";

export default component({
    template: ({ count, count2 }) => `
        <div>
            <h1>App ${count}</h1>
            <h2>${count2}</h2>
        </div>
    `,
    refs: {
        count: 0,
    },
    computes: {
        count2: ({ count }: { count: number }) => count + 333,
    }
})
