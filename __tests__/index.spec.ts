import PdStepManager from "../src/index";
describe("PdStepManager class", () => {
  it("Check if class is exists", () => {
    expect(PdStepManager instanceof Function).toBe(true);
  });

  describe("all method exists", () => {
    const params = {
      env: {},
    };
    const event = {
      raw_event: {
        query: {},
      },
      query: {
        step: "",
      },
    };
    const MyClass = new PdStepManager(params, event);
    it("Check if requiredData method exists", () => {
      expect(typeof MyClass.requiredData).toBe("function");
    });
    it("Check if checkRequiredStepParams method exists", () => {
      expect(typeof MyClass.checkRequiredStepParams).toBe("function");
    });
    it("Check if skipStep method exists", () => {
      expect(typeof MyClass.skipStep).toBe("function");
    });
    it("Check if getCurrentEndpointUrl method exists", () => {
      expect(typeof MyClass.getCurrentEndpointUrl).toBe("function");
    });
    it("Check if get method exists", () => {
      expect(typeof MyClass.get).toBe("function");
    });
  });
});
