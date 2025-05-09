export interface AdminPlayerReview {
  id: number;
  playerId: number;
  authorName: string;
  note: number;
  content: string;
  createdAt: Date;
  accepted: boolean;
}
