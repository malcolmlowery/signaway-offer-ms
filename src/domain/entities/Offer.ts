import { randomUUID } from 'crypto'
import { IOfferDTO, IOwner, Status } from '../../interfaces/Offer'
import { MakeEventInput } from '../../interfaces/Event'

export class Offer {
  private offerId: string
  private address: string
  private apartmentName: string
  private createdAt: string
  private updatedAt: string
  private offerStatus: Status
  private owner: IOwner

  constructor() {
    this.offerId = ''
    this.apartmentName = ''
    this.address = ''
    this.createdAt = ''
    this.updatedAt = ''
    this.offerStatus = 'AVAILABLE'
    this.owner = {
      id: '',
      displayName: '',
      email: '',
      phoneNumber: ''
    }
  }

  private make(): IOfferDTO {
    const currentTime = this.getCurrenTime()

    this.offerId = randomUUID()
    this.apartmentName = ''
    this.address = ''
    this.createdAt = currentTime
    this.updatedAt = ''
    this.offerStatus = 'AVAILABLE'
    this.owner = {
      id: '',
      displayName: '',
      email: '',
      phoneNumber: ''
    }

    return this.getDTO()
  }

  public getDTO(): IOfferDTO {
    return {
      offerId: this.offerId,
      apartmentName: this.apartmentName,
      address: this.address,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      offerStatus: this.offerStatus,
      owner: this.owner
    }
  }

  private getCurrenTime(): string {
    const date = new Date()
    return date.toISOString()
  }

  public updateStatus(status: Status): void {
    this.offerStatus = status
    this.updatedAt = this.getCurrenTime()
  }

  private canBeCanceled(): boolean {
    if (this.offerStatus === 'AVAILABLE') return true
    return false
  }

  private cancel() {
    const newStatus: Status = 'UNAVAILABLE'

    this.updateStatus(newStatus)

    return {
      event: {
        eventName: 'CANCEL',
        offerId: this.offerId,
        offerStatus: this.offerStatus,
        apartmentName: this.apartmentName,
        createdAt: this.getCurrenTime()
      },
      newStatus
    }
  }
}

export interface OfferCommand {
  event: MakeEventInput
  newStatus: Status
}
