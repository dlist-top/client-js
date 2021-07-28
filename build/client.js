"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var winston_1 = require("winston");
var events_1 = __importDefault(require("events"));
var ws_1 = __importDefault(require("ws"));
var entity_1 = require("./types/entity");
var loglevels_1 = require("./types/loglevels");
var constants_1 = require("./constants");
var payload_1 = require("./types/payload");
var EVENTS = __importStar(require("./types/events"));
var utils_1 = require("./utils");
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client(token, loggingLevel) {
        if (loggingLevel === void 0) { loggingLevel = loglevels_1.LogLevels.INFO; }
        var _this = _super.call(this) || this;
        _this.reconnectionAttempts = 0;
        _this.token = token;
        _this.logger = winston_1.createLogger({
            level: loggingLevel,
            format: winston_1.format.simple(),
            transports: [
                new winston_1.transports.Console(),
            ]
        });
        return _this;
    }
    Client.prototype.login = function () {
        var _this = this;
        this.logger.debug('Trying to establish connection with DList gateway...');
        var ws = this.ws = new ws_1.default(constants_1.GATEWAY_URL);
        ws.on('message', function (d) { return __awaiter(_this, void 0, void 0, function () {
            var data, payload, _timeToReconnect, event, d_1;
            var _this = this;
            return __generator(this, function (_a) {
                data = JSON.parse(d);
                payload = new payload_1.GatewayPayload(data);
                switch (payload.op) {
                    case payload_1.GatewayOP.HELLO:
                        this.logger.debug("Connected to the DList gateway. Message: " + payload.data);
                        ws.send(JSON.stringify({
                            op: payload_1.GatewayOP.IDENTIFY.valueOf(),
                            data: {
                                token: this.token
                            }
                        }));
                        this.logger.debug("Identify packet was sent.");
                        break;
                    case payload_1.GatewayOP.READY:
                        this.entity = new entity_1.Entity(data.data);
                        this.logger.info("Ready. Connected to " + this.entity.name + " (" + this.entity.id + ") - Type: " + this.entity.type);
                        this.emit('ready', this.entity);
                        this.reconnectionAttempts = 0;
                        break;
                    case payload_1.GatewayOP.DISCONNECT:
                        this.logger.debug("Disconnected with reason " + payload.data + " - Reconnecting in " + constants_1.RECONNECT_TIMEOUT + "ms...");
                        this.emit('disconnect', payload.data, constants_1.RECONNECT_TIMEOUT);
                        delete this.entity;
                        if (payload.data === 'The given token is invalid..') {
                            this.logger.debug("Invalid token was provided, client won't be reconnecting.");
                            break;
                        }
                        if (this.reconnectionAttempts >= constants_1.RECONNECT_MAX_ATTEMPTS) {
                            this.logger.debug("RECONNECT_MAX_ATTEMPTS limit reached, client won't be reconnecting...");
                            break;
                        }
                        _timeToReconnect = setTimeout(function () {
                            _this.reconnectionAttempts++;
                            _this.login();
                        }, constants_1.RECONNECT_TIMEOUT);
                        break;
                    case payload_1.GatewayOP.EVENT:
                        if (!(payload.event in EVENTS)) {
                            this.logger.debug("Unsupported event: " + payload.event);
                            break;
                        }
                        event = utils_1.getKeyValue(EVENTS)(payload.event);
                        d_1 = new event(payload.data);
                        this.logger.debug("Event received: " + payload.event);
                        this.emit(payload.event.toLowerCase(), d_1, this.entity);
                        if (event === EVENTS.VOTE)
                            this.entity.votes = d_1.totalVotes;
                        break;
                }
                return [2 /*return*/];
            });
        }); });
    };
    return Client;
}(events_1.default));
exports.Client = Client;
