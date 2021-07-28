import { Base } from "./base";

export enum EntityType {
    BOT = 'bots',
    SERVER = 'servers'
}

export class Entity extends Base {
    id: string;
    name: string;
    type: EntityType;
    votes?: number;
}
