import { Context } from './Context';
declare class EuronewsError extends Error {
    isEuronewsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { EuronewsError };
