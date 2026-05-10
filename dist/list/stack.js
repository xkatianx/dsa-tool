export class Stack {
    values = [];
    get length() {
        return this.values.length;
    }
    get top() {
        return this.values.at(-1);
    }
    at(index) {
        return this.values.at(index);
    }
    push(val) {
        this.values.push(val);
    }
    pop() {
        return this.values.pop();
    }
}
