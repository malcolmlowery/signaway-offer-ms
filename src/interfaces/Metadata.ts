export type MetadataConfigInput = {
  version: number
  lifecycleStage: LifecycleStage
  domain: string
  system: string
  service: string
  team: string
  hostPlatform: string
  owner: string
  region: string
  juristiction: string
  tags?: string[]
  dataSensitivity?: DataSensitivity
}

export type Metadata = MetadataConfigInput & {
  id: string
  correlationId: string
  timestamp: string
  timestampEpoch: string
}

type LifecycleStage = 'production' | 'qa' | 'test' | 'development'

type DataSensitivity = 'public' | 'senisitive' | 'proprietary' | 'secret'
