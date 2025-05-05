import { Borough } from "../../boroughs/model/borough";
import { PlayerInfo } from "./playerInfo";

export interface CountryDetails {
    id: number;
    name: string;
    slug: string;
    playerInfoList: PlayerInfo[];
    goldLimit: string;
    sheriffStartDate: string;
    boroughCount: number;
    boroughs: Borough[];
    allGold: string;
    goldToCollect: string;
    goldByPlayers: { [playerName: string]: string };
    goldByClan: { [clan in string]?: string };
    playerPercentage: { [playerName: string]: string };
    clanPercentage: { [clan in string]?: string };
  }