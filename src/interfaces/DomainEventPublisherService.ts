import { IEvent } from './Event'
import { EventEmitter } from './EventEmitter'

// The DomainEventPublisherService makes it easy to emit domain events.
export interface DomainEventPublisherService {
  publish: (event: IEvent) => Promise<void>
}

// Requires dependencies for instantiating a new DomainEventPublisherService.
export type DomainEventPublisherDependencies = {
  eventEmitter: EventEmitter
}
