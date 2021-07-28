import { Base } from "./base";
import { EntityType } from "./entity";
declare class VoteData extends Base {
    authorID: string;
    entityType: EntityType;
    entityID: string;
    date: Date;
    totalVotes: number;
    userVotes: number;
}
declare class RateData extends Base {
    authorID: string;
    entityType: EntityType;
    entityID: string;
    date: Date;
    rating: number;
    details: string;
}
export { VoteData as VOTE, RateData as RATE };
