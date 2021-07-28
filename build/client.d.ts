/// <reference types="node" />
import { Logger } from "winston";
import EventEmitter from "events";
import WebSocket from "ws";
import { Entity } from "./types/entity";
import { LogLevels } from "./types/loglevels";
import { ClientEvents } from "./utils";
export declare class Client extends EventEmitter {
    token?: string;
    entity?: Entity;
    logger: Logger;
    ws: WebSocket;
    reconnectionAttempts: number;
    constructor(token?: string, loggingLevel?: LogLevels | string);
    login(): void;
}
export declare interface Client {
    on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
}
