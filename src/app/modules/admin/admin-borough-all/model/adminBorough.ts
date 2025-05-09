export interface AdminBorough {
    id: number,
    name: string,
    slug: string,
    countryId: number,
    actualLeaderId: number,
    leaderStartDate: Date,
    actualGold: number,
    goldAddedBy: number,
    dateAdded: Date,
    emailSend: boolean
}