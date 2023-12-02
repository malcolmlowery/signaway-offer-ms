export function setCorrelationId(event: Record<string, any>, context: Record<string, any>): void {
  process.env.CORRELATION_ID =
    event?.details?.metadata?.correlationId || context?.awsRequestId || 'UNKNOWN'
}

export function getCorrelationId(): string {
  return process.env.CORRELATION_ID || 'UNKNOWN'
}
