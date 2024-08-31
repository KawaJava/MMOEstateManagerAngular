export interface AdminGoldHistory {
    id: number,
    boroughId: number,
    gold: number,
    goldAddedBy: number,
    dateAdded: Date,
    emailSend: boolean
}