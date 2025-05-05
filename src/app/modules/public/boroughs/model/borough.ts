import { Player } from "../../players/model/player";

export interface Borough {
    id: number;
    name: string;
    slug: string;
    countryId: number;
    actualLeader: Player;
    leaderStartDate: string;
    actualGold: string;
    goldAddedBy: Player;
    dateAdded: string;
    emailSend: boolean;
}