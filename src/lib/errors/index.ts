
class ServiceError extends Error {
  public readonly status: number;

  public readonly message: string;
  public readonly helperText: string;

  constructor(status: number, message: string, helperText: string) {
    super(message);

    this.name = 'ServiceError';
    this.message = message;

    this.status = status;
    this.helperText = helperText;
  }
}

export class RateLimitError extends ServiceError {
  public readonly retryAfterSeconds: number | null;

  constructor(retryAfterSeconds: number) {
    const retryAfterMinutes = retryAfterSeconds / 60;
    const retryAfterDisplay = retryAfterMinutes > 60
      ? `${(retryAfterMinutes / 60).toFixed(1)} hours`
      : `${retryAfterMinutes.toFixed(0)} minutes`;

    super(402, 'Rate limit exceeded', `Please try again after ${retryAfterDisplay}`);

    this.name = 'RateLimitError';

    this.retryAfterSeconds = retryAfterSeconds;
  }

  get json() {
    return JSON.parse(JSON.stringify(this));
  }
}
