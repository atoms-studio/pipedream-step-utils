export interface Utils {
  checkRequiredStepParams(requiredParams: string[]): never | object;
  skipStep(stepName: string): boolean;
  getCurrentEndpointUrl(): string;
  get(url: string, opts?: object): Promise<any>;
}
