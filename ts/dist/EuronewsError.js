"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EuronewsError = void 0;
class EuronewsError extends Error {
    isEuronewsError = true;
    sdk = 'Euronews';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.EuronewsError = EuronewsError;
//# sourceMappingURL=EuronewsError.js.map