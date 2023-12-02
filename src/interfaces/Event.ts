import { Status } from './Offer'
import { MetadataConfigInput, Metadata } from './Metadata'

export interface IEvent {
  get: () => EventBridgeEvent
  getAnalyticsVariant: (analyticsBusName: string) => EventBridgeEvent
}

export type EventInput = {
  event: MakeEventInput
  metadataConfig: MetadataConfigInput
}

export type MetadataInput = {
  id: string
  correlationId: string
  version: number
}

export type MakeEventInput = {
  eventName: UserInteractionEvent | SystemInteractionEvent
  offerId: string
  apartmentName: string
  createdAt: string
  offerStatus: Status
}

export type EventDTO = {
  eventBusName: string
  detailType: DetailType
  eventName: string
  metaData: Metadata
  data: Data
}

export type EventBridgeEvent = {
  EventBusName: string
  Source: string
  DetaileType: DetailType
  Detail: string
}

export type EventDetail = {
  metaData: Metadata
  data: Data
}

type Data = Record<string, any> | string

type UserInteractionEvent = 'AVAILABLE' | 'UNAVAILABLE'
type SystemInteractionEvent = 'OPENED' | 'CLOSED'

export type DetailType = UserInteractionDetailType | SystemInteractionType

type UserInteractionDetailType = 'Available' | 'Unavailable'
type SystemInteractionType = 'Opened' | 'Closed'
