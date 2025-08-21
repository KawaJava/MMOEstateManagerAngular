import { AdminPlayer } from "../../admin-player-all/model/adminPlayer";
import { AiOpinion } from "./aiOpinion";

export interface AdminPlayerReviewWithAI {
  id: number;
  player: AdminPlayer;
  authorName: string;
  note: number;
  content: string;
  createdAt: Date;
  accepted: boolean;
  aiOpinion: AiOpinion;
}