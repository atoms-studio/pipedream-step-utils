import { PdProcess, PdEvent } from "./types";
import { Utils } from "./interfaces";
import axios from "axios";

export default class PipedreamStepUtils implements Utils {
  readonly eventQuery: Record<string, any> = {};
  constructor(readonly process: PdProcess, readonly event: PdEvent) {
    this.process = process;
    this.event = event;
    this.eventQuery =
      this.event?.raw_event?.query &&
      Object.entries(this.event.raw_event.query).length
        ? this.event.raw_event.query
        : this.event?.query && Object.entries(this.event.query).length
        ? this.event.query
        : {};
  }

  /**
   * Check required step params
   *
   * @example
   * const manager = new PipedreamStepUtils();
   * try {
   *    const res = manager.checkRequiredStepParams(["param1", "param2"]);
   *    console.log(res);
   * } catch (err) {
   *    console.log(err.message);
   * }
   *
   * @param requiredParams
   * @returns
   */
  checkRequiredStepParams = (requiredParams: string[]): never | object => {
    if (requiredParams.length) {
      const validateParams: any = {};
      const notValidParams = [];
      for (const requiredParam of requiredParams) {
        if (!Object.entries(this.eventQuery).length) {
          throw new Error(`No event query found`);
        } else if (!this.eventQuery[requiredParam]) {
          notValidParams.push(requiredParam);
        } else {
          validateParams[requiredParam] = this.eventQuery[requiredParam];
        }
      }

      if (notValidParams.length) {
        throw new Error(`Required params not found: ${notValidParams}`);
      } else {
        return validateParams;
      }
    } else {
      throw new Error(`No required params found`);
    }
  };

  /**
   * Check if you need to skip the step
   *
   * @param stepName
   * @returns boolean
   */
  skipStep = (stepName: string): boolean => {
    return !!(this.eventQuery?.step && this.eventQuery.step !== stepName);
  };

  /**
   * Check if you need to stop process to step
   *
   * @param stepName
   * @returns boolean
   */
  stopToStep = (stepName: string): boolean => {
    return !!(this.eventQuery?.step && this.eventQuery.step === stepName);
  };

  /**
   * Get current endpoint URL
   *
   * @returns string
   */
  getCurrentEndpointUrl = (): string => {
    return `${this.event.headers["x-forwarded-proto"]}://${this.event.headers.host}`;
  };

  /**
   * Get url request
   *
   * @example
   * const manager = new PipedreamStepUtils();
   * manager
   * .get("https://jsonplaceholder.typicode.com/posts", { userId: 2 })
   * .then((res) => {
   *    console.log(res.data);
   * })
   * .catch((err) => {
   *    console.log(err.message);
   * });
   *
   * @param url
   * @param opts
   * @returns
   */
  get = async (url: string, opts?: object): Promise<any> => {
    return axios.get(url, opts);
  };
}
