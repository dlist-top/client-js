import { Base } from "./base";
import { EntityType } from "./entity";

class VoteData extends Base {
    authorID: string;
    entityType: EntityType;
    entityID: string;
    date: Date;
    totalVotes: number;
    userVotes: number;
}

class RateData extends Base {
    authorID: string;
    entityType: EntityType;
    entityID: string;
    date: Date;
    rating: number;
    details: string;
}

export {
    VoteData as VOTE,
    RateData as RATE
}
