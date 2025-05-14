import { Country } from "../../countries/model/country";

export interface PlayerDetails {
  name: string;
  email: string;
  clan: string;
  created: Date;
  active: boolean;
  countries: Country[];
}