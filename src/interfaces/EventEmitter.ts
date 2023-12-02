import { EventBridgeEvent } from './Event'

// The EventEmitter is what we use to emit domain events and integration events
// into our landscape.
export interface EventEmitter {
  emit: (event: EventBridgeEvent) => Promise<void>
}
