import { IEvent, EventDTO } from './Event'

export interface Repository {
  updateOffer: (offer: EventDTO) => Promise<void>
  addEvent: (event: IEvent) => Promise<void>
}
