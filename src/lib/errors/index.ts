
class ServiceError extends Error {
  public readonly status: number;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
  }
}

export class RateLimitError extends ServiceError {
  public readonly retryAfterSeconds: number | null;

  constructor(retryAfterSeconds: number) {
    super(402, 'Rate limit exceeded');

    this.retryAfterSeconds = retryAfterSeconds;
  }

  get data() {
    return {
      retryAfterSeconds: this.retryAfterSeconds,
    };
  }
}
