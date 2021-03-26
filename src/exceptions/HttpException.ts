class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, error: Error | string) {
    if (error instanceof Error) {
      super(error.message);
      this.status = status;
      this.message = error.message;
    } else {
      super(error);
      this.status = status;
      this.message = error;
    }
  }
}

export default HttpException;
