import {Entity} from "./types/entity";
import * as EVENTS from "./types/events";

export const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) =>
    obj[key];
export interface ClientEvents {
    ready: [Entity];
    vote: [EVENTS.VOTE, Entity];
    rate: [EVENTS.RATE, Entity];
    disconnect: [string, number];
}
