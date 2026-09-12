import { EuronewsEntityBase } from '../EuronewsEntityBase';
import type { EuronewsSDK } from '../EuronewsSDK';
import type { Control } from '../types';
import type { New, NewListMatch } from '../EuronewsTypes';
declare class NewEntity extends EuronewsEntityBase<New> {
    constructor(client: EuronewsSDK, entopts: any);
    make(this: NewEntity): NewEntity;
    list(this: any, reqmatch?: NewListMatch, ctrl?: Control): Promise<NewEntity[]>;
}
export { NewEntity };
