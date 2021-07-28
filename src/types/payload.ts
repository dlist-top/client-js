import { Base } from "./base";

export enum GatewayOP {
    HELLO = 1,
    IDENTIFY,
    READY,
    DISCONNECT,
    EVENT,
}

export class GatewayPayload extends Base {
    op: GatewayOP;
    data: any;
    event: string;
}
