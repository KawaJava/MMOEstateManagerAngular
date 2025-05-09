import { AdminPlayer } from "../../admin-player/model/adminPlayer";

export interface AdminPlayerReview {
  id: number;
  player: AdminPlayer;
  authorName: string;
  note: number;
  content: string;
  createdAt: Date;
  accepted: boolean;
}
