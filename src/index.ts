import { PD_Process, PD_Event } from "./types";
import axios from "axios";

export default class PdStepManager {
  private event: PD_Event;
  private process: PD_Process;
  constructor(PDProcess: PD_Process, PDEvent: PD_Event) {
    this.process = PDProcess;
    this.event = PDEvent;

    this.requiredData();
  }

  requiredData = () => {
    const notFoundData = [];

    if (typeof this.event !== "object") {
      notFoundData.push("event");
    } else if (!this.event.raw_event && !this.event.query) {
      notFoundData.push("event.env or event.query");
    }

    if (typeof this.process !== "object") {
      notFoundData.push("process");
    } else if (!this.process.env) {
      notFoundData.push("process.env");
    }

    if (notFoundData.length) {
      throw new Error(`Required data not found: ${notFoundData}`);
    }
  };

  /**
   * Check required step params
   *
   * @example
   * const manager = new PdStepManager();
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
    if (requiredParams) {
      const eventQuery: any = this.event.raw_event
        ? this.event.raw_event.query
        : this.event.query;
      const validateParams: any = {};
      const notValidParams = [];
      for (const requiredParam of requiredParams) {
        if (!eventQuery) {
          throw new Error(`No event query found`);
        } else if (!eventQuery[requiredParam]) {
          notValidParams.push(requiredParam);
        } else {
          validateParams[requiredParam] = eventQuery[requiredParam];
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
    return !!(this.event?.query?.step && this.event?.query?.step !== stepName);
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
   * const manager = new PdStepManager();
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
  get = async (url: string, opts?: object) => {
    return axios.get(url, opts);
  };
}
