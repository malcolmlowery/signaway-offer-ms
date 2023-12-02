import { MikroLog } from 'mikrolog'

// Aggregates/Entities
import { Offer } from '../../domain/entities/Offer'

// Events
import { CreateOffer } from '../../domain/events/Event'

// Interfaces
import { IOfferDTO, Status } from '../../interfaces/Offer'
import { Repository } from '../../interfaces/Repository'
import { Dependencies } from '../../interfaces/Dependencies'
import { MetadataConfigInput } from '../../interfaces/Metadata'
import { IEvent } from '../../interfaces/Event'
import { DomainEventPublisherService } from '../../interfaces/DomainEventPublisherService'

export class OfferService {}
