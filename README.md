# Pipedream Step Utils

A collection of features that can be useful in [Pipedream](https://pipedream.com/) steps.

## How To Include

The best way to include Pipedream Step Utils on [Pipedream](https://pipedream.com/) is to type within each single step where it should be used:

```javascript
const PipedreamStepUtils = require("pipedream-step-utils").default;
const stepUtils = new PipedreamStepUtils(process, event);
```

## Methods

### Check required step params

If your step necessarily requires some parameters, which must be passed via query, you can use the `checkRequiredStepParams` method:

```javascript
const PipedreamStepUtils = require("pipedream-step-utils").default;
const stepUtils = new PipedreamStepUtils(process, event);
const requiredParams = ["foo", "bar"];
stepUtils.checkRequiredStepParams(requiredParams);
```

Will throw an exception if it does not find all required parameters or returns an object with all required parameters and their respective values.

### Skip step

If you want to specify a step to start from in the endpoint (example: `https: //myendpoint.m.pipedream.net?step=foo`), you will need to insert the following code in each step of the workflow:

```javascript
const stepName = params.stepName;
if (stepUtils.skipStep(stepName)) {
  console.log(`Skip "${stepName}" step`);
  return false;
}
```

In this way if the name attributed to the current step (`stepName`) is not the one specified in the query (`step=foo`) then it will not execute the code contained in it, passing to the next step.

### Get current endpoint URL

If you need to know the url of the current endpoint you can use the following method:

```javascript
const PipedreamStepUtils = require("pipedream-step-utils").default;
const stepUtils = new PipedreamStepUtils(process, event);
const currentEnpoint = stepUtils.getCurrentEndpointUrl();
```

### GET request

If you need to make a GET request, for example to invoke the same or another workflow asynchronously, you can use the method:

```javascript
const PipedreamStepUtils = require("pipedream-step-utils").default;
const stepUtils = new PipedreamStepUtils(process, event);
const url = stepUtils.getCurrentEndpointUrl();
await stepUtils.get(url, {
  params: {
    foo: "bar",
    step: "stepFoo",
    offset: 10,
    limit: 100,
    ...
  },
});
```
