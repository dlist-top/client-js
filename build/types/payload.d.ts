import { Base } from "./base";
export declare enum GatewayOP {
    HELLO = 1,
    IDENTIFY = 2,
    READY = 3,
    DISCONNECT = 4,
    EVENT = 5
}
export declare class GatewayPayload extends Base {
    op: GatewayOP;
    data: any;
    event: string;
}
