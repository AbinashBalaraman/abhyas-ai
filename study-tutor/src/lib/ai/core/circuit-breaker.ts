export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

export interface CircuitBreakerConfig {
  failureThreshold: number; // e.g. 3 consecutive failures before opening
  cooldownPeriodMs: number; // e.g. 30,000ms cooldown before testing half-open
}

export class ModelCircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failureCount = 0;
  private lastStateChange = Date.now();

  constructor(
    public readonly providerName: string,
    private readonly config: CircuitBreakerConfig = { failureThreshold: 3, cooldownPeriodMs: 30000 }
  ) {}

  public isAvailable(): boolean {
    if (this.state === 'CLOSED') return true;
    
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastStateChange > this.config.cooldownPeriodMs) {
        this.state = 'HALF_OPEN';
        this.lastStateChange = Date.now();
        return true;
      }
      return false;
    }

    return true; // HALF_OPEN allows single test probe
  }

  public recordSuccess(): void {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  public recordFailure(): void {
    this.failureCount++;
    if (this.failureCount >= this.config.failureThreshold) {
      this.state = 'OPEN';
      this.lastStateChange = Date.now();
      console.warn(`[CircuitBreaker] Provider "${this.providerName}" transitioned to OPEN state (failures: ${this.failureCount})`);
    }
  }

  public getState(): CircuitState {
    return this.state;
  }
}
