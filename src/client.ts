import {createLogger as WLogger, format as WFormat, Logger, transports as WTransports} from "winston";
import EventEmitter from "events";
import WebSocket from "ws";
import {Entity} from "./types/entity";
import {LogLevels} from "./types/loglevels";
import {GATEWAY_URL, RECONNECT_MAX_ATTEMPTS, RECONNECT_TIMEOUT} from "./constants";
import {GatewayOP, GatewayPayload} from "./types/payload";
import * as EVENTS from "./types/events";
import {ClientEvents, getKeyValue} from "./utils";

export class Client extends EventEmitter {
    token?: string;
    entity?: Entity;
    logger: Logger;
    ws: WebSocket;
    reconnectionAttempts: number = 0;

    constructor(token?: string, loggingLevel: LogLevels|string  = LogLevels.INFO) {
        super();
        this.token = token;
        this.logger = WLogger({
            level: loggingLevel as LogLevels,
            format: WFormat.simple(),
            transports: [
                new WTransports.Console(),
            ]
        });
    }

    login() {
        this.logger.debug('Trying to establish connection with DList gateway...');

        let ws = this.ws = new WebSocket(GATEWAY_URL);
        ws.on('message', async (d: any) => {
            let data = JSON.parse(d as string);
            let payload = new GatewayPayload(data);

            switch (payload.op) {
                case GatewayOP.HELLO:
                    this.logger.debug(`Connected to the DList gateway. Message: ${payload.data}`);
                    ws.send(JSON.stringify({
                        op: GatewayOP.IDENTIFY.valueOf(),
                        data: {
                            token: this.token
                        }
                    }));
                    this.logger.debug(`Identify packet was sent.`);
                    break;
                case GatewayOP.READY:
                    this.entity = new Entity(data.data);
                    this.logger.info(`Ready. Connected to ${this.entity.name} (${this.entity.id}) - Type: ${this.entity.type}`);
                    this.emit('ready', this.entity);
                    this.reconnectionAttempts = 0;
                    break;
                case GatewayOP.DISCONNECT:
                    this.logger.debug(`Disconnected with reason ${payload.data} - Reconnecting in ${RECONNECT_TIMEOUT}ms...`);
                    this.emit('disconnect', payload.data, RECONNECT_TIMEOUT);
                    delete this.entity;
                    if(payload.data === 'The given token is invalid..') {
                        this.logger.debug(`Invalid token was provided, client won't be reconnecting.`);
                        break;
                    }
                    if(this.reconnectionAttempts >= RECONNECT_MAX_ATTEMPTS) {
                        this.logger.debug(`RECONNECT_MAX_ATTEMPTS limit reached, client won't be reconnecting...`);
                        break;
                    }
                    let _timeToReconnect = setTimeout(() => {
                        this.reconnectionAttempts++;
                        this.login();
                    }, RECONNECT_TIMEOUT);
                    break;
                case GatewayOP.EVENT:
                    if(!(payload.event in EVENTS)) {
                        this.logger.debug(`Unsupported event: ${payload.event}`);
                        break;
                    }
                    let event = getKeyValue(EVENTS)(payload.event as any);
                    let d = new event(payload.data);
                    this.logger.debug(`Event received: ${payload.event}`);
                    this.emit(payload.event.toLowerCase(), d, this.entity);
                    if(event === EVENTS.VOTE)
                        this.entity!.votes = (d as EVENTS.VOTE).totalVotes;
                    break;
            }
        })
    }
}

export declare interface Client {
    on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void): this;
}
