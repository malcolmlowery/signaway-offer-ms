import { Repository } from './Repository'
import { DomainEventPublisherService } from './DomainEventPublisherService'
import { MetadataConfigInput } from './Metadata'

// Represents the basic dependencies that usually needs to be injected into our use cases.
export type Dependencies = {
  repository: Repository
  domainEventPublisher: DomainEventPublisherService
  metadataConfig: MetadataConfigInput
}
