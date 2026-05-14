import { Stack } from "./stack.js";
export class MinStack extends Stack {
    compare;
    mins = [];
    constructor(compare) {
        super();
        this.compare = compare;
    }
    /** Get the current minimum. Time: O(1) */
    get min() {
        return this.mins.at(-1);
    }
    /** Push a new element onto the stack. Time: amortized O(1) + O(`compare`) */
    push(val) {
        super.push(val);
        if (this.min == null)
            return void this.mins.push(val);
        this.compare(this.min, val) <= 0
            ? this.mins.push(this.min)
            : this.mins.push(val);
    }
    /** Pop the latest element. Time: amortized O(1) */
    pop() {
        this.mins.pop();
        return super.pop();
    }
}
