import { Base } from "./base";
export declare enum EntityType {
    BOT = "bots",
    SERVER = "servers"
}
export declare class Entity extends Base {
    id: string;
    name: string;
    type: EntityType;
    votes?: number;
}
