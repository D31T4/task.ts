"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeyGenerator {
    constructor() {
        this.count = 0;
    }
    generateKey() {
        return this.count++;
    }
}
exports.default = KeyGenerator;
