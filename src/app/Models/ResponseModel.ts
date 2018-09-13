export class Response<T> {
    Success: boolean;
  
    Message: string;
    AppVersion: string;
    accessToken: string;
    Result: T;
    Create(success: boolean, message: string, result: T): void {
        this.Success = success;
        this.Message = message;
        this.Result = result;
    }
  }
  