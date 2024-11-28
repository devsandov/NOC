interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccesCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly successCallback: SuccesCallback,
    private readonly errorCallback: ErrorCallback
  ) { }

  public async execute(url: string): Promise<boolean> {

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
      }

      this.successCallback();

      return true;
    } catch (error) {

      this.errorCallback(`${error}`);

      return false;
    }
  }
}
