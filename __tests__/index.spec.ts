import PipedreamStepUtils from "../src/index";
describe("PipedreamStepUtils class", () => {
  it("Check if class is exists", () => {
    expect(PipedreamStepUtils instanceof Function).toBe(true);
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
    const PipedreamStepUtilsClass = new PipedreamStepUtils(params, event);

    it("Check if checkRequiredStepParams method exists", () => {
      expect(typeof PipedreamStepUtilsClass.checkRequiredStepParams).toBe(
        "function"
      );
    });
    it("Check if skipStep method exists", () => {
      expect(typeof PipedreamStepUtilsClass.skipStep).toBe("function");
    });
    it("Check if getCurrentEndpointUrl method exists", () => {
      expect(typeof PipedreamStepUtilsClass.getCurrentEndpointUrl).toBe(
        "function"
      );
    });
    it("Check if get method exists", () => {
      expect(typeof PipedreamStepUtilsClass.get).toBe("function");
    });
  });

  describe("Method checkRequiredStepParams", () => {
    it("throws an error if required params not found", () => {
      expect(() =>
        new PipedreamStepUtils(
          { env: {} },
          { query: { step: "bar" } }
        ).checkRequiredStepParams([])
      ).toThrow("No required params found");
    });

    it("throws an error if required params not found", () => {
      expect(() =>
        new PipedreamStepUtils(
          { env: {} },
          { query: { step: "bar" } }
        ).checkRequiredStepParams([])
      ).toThrow("No required params found");
    });

    it("throws an error with a required params found", () => {
      expect(() =>
        new PipedreamStepUtils(
          { env: {} },
          { query: { step: "foo" } }
        ).checkRequiredStepParams(["foo"])
      ).toThrow("Required params not found: foo");
    });

    it("check required params found", () => {
      expect(
        new PipedreamStepUtils(
          { env: {} },
          { query: { step: "foo" } }
        ).checkRequiredStepParams(["step"])
      ).toStrictEqual({ step: "foo" });
    });

    it("throws an error if no event query found", () => {
      expect(() =>
        new PipedreamStepUtils(
          { env: {} },
          { query: {} }
        ).checkRequiredStepParams(["foo"])
      ).toThrow("No event query found");
    });
  });

  describe("Method skipStep", () => {
    it("Return boolean", () => {
      expect(
        typeof new PipedreamStepUtils(
          { env: {} },
          { query: { step: "foo" } }
        ).skipStep("bar")
      ).toBe("boolean");
    });
    it("Returns true if it must skip", () => {
      const currentStepName = "bar";
      expect(
        new PipedreamStepUtils(
          { env: {} },
          { raw_event: { query: { step: "foo" } } }
        ).skipStep(currentStepName)
      ).toBe(true);
    });
  });

  describe("Method getCurrentEndpointUrl", () => {
    it("Return current endpoint", () => {
      expect(
        new PipedreamStepUtils(
          { env: {} },
          { headers: { "x-forwarded-proto": "https", host: "domain.net" } }
        ).getCurrentEndpointUrl()
      ).toBe("https://domain.net");
    });
  });

  describe("Method get", () => {
    it("Make an axios GET request", async () => {
      const baseURL = "http://www.google.com";
      const request = await new PipedreamStepUtils(
        { env: {} },
        { headers: { "x-forwarded-proto": "https", host: "domain.net" } }
      ).get(baseURL);

      expect(request.config.url).toBe(baseURL);
      expect(request.config.method).toBe("get");
    });
  });
});
