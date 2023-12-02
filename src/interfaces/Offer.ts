export interface IOwner {
  id: string
  displayName: string
  email: string
  phoneNumber: string
}

export interface IOfferDTO {
  offerId: string
  apartmentName: string
  address: string
  createdAt: string
  updatedAt: string
  offerStatus: Status
  owner: IOwner
}

export type Status = 'AVAILABLE' | 'UNAVAILABLE'
