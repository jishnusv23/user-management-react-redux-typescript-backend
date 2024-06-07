"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePassword = void 0;
function makePassword() {
    return Math.random().toString(32).slice(-8);
}
exports.makePassword = makePassword;
