import { randomUUID } from 'crypto'

import {
  EventInput,
  EventDetail,
  EventBridgeEvent,
  EventDTO,
  MakeEventInput,
  MetadataInput
} from '../../interfaces/Event'
import { Metadata, MetadataConfigInput } from '../../interfaces/Metadata'

import { getCorrelationId } from '../../infrastructure/utils/userMetadata'

abstract class EmittableEvent {
  private readonly event: EventBridgeEvent
  private readonly eventBusName: string
  private readonly metadataConfig: MetadataConfigInput

  constructor(eventInput: EventInput) {
    const { event, metadataConfig } = eventInput
    this.eventBusName = process.env.DOMAIN_BUS_NAME || ''
    this.metadataConfig = metadataConfig

    if (!this.eventBusName) return
  }

  private toDTO(eventInput: MakeEventInput): EventDTO {
    const { eventName, offerId } = eventInput

    const detailType = this.matchDetailType(eventName)
    const timeNow = Date.now()

    return {
      eventBusName: this.eventBusName,
      eventName,
      detailType,
      metaData: {
        ...this.metadataConfig,
        version: 1,
        id: randomUUID().toString(),
        correlationId: getCorrelationId(),
        timestamp: new Date(timeNow).toISOString(),
        timestampEpoch: `${timeNow}`
      },
      data: {
        event: eventName,
        offerId,
        offerStatus: eventInput.offerStatus,
        apartmentName: eventInput.apartmentName || '',
        createdAt: eventInput.createdAt || ''
      }
    }
  }

  private make(eventDTO: EventDTO): EventBridgeEvent {
    const { eventBusName, data, detailType, metaData } = eventDTO
    const { version, id, correlationId } = metaData
    const source = `${metaData.domain?.toLowerCase()}.${metaData.system?.toLowerCase()}.${detailType.toLowerCase()}`

    const detail: EventDetail = {
      metadata: this.produceMetadata({ version, id, correlationId }),
      data
    }

    return {
      EventBusName: eventBusName,
      Source: source,
      DetaileType: detailType,
      Detail: JSON.stringify(detail)
    }
  }

  private produceMetadata(metadataInput: MetadataInput): Metadata {
    const { version, id, correlationId } = metadataInput

    if (
      !version ||
      !this.metadataConfig.lifecycleStage ||
      !this.metadataConfig.system ||
      !this.metadataConfig.domain ||
      !this.metadataConfig.service ||
      !this.metadataConfig.team
    ) {
      console.log('Metadata not valid')
    }

    const timeNow = Date.now()

    return {
      timestamp: new Date(timeNow).toISOString(),
      timestampEpoch: `${timeNow}`,
      id,
      correlationId,
      version,
      lifecycleStage: this.metadataConfig.lifecycleStage,
      system: this.metadataConfig.system,
      domain: this.metadataConfig.domain,
      service: this.metadataConfig.service,
      team: this.metadataConfig.team,
      hostPlatform: this.metadataConfig.hostPlatform,
      owner: this.metadataConfig.owner,
      region: this.metadataConfig.region,
      juristiction: this.metadataConfig.juristiction,
      tags: this.metadataConfig.tags,
      dataSensitivity: this.metadataConfig.dataSensitivity
    }
  }

  public get() {
    return this.event
  }

  private matchDetailType(eventName: string) {
    switch (eventName) {
      case 'CREATED':
        return 'created'
      default:
        return console.log('NO CASE')
    }
  }
}

// An event the represents the "Created" variant state.
export class CreateOffer extends EmittableEvent {}
