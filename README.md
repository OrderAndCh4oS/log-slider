# log-slider

https://sarcoma.github.io/log-slider/

## Setup

*Example log scaling slider*
```javascript
const handleDemoLogUpdate = (value, log) => {
    console.log(value, log);
};

const demoLog = new LogSlider({
    id: 'log-scale',
    min: 100,
    max: 10000,
    type: sliderTypes.LOG,
    showTab: true,
    inputHandler: handleDemoLogUpdate,
    changeHandler: handleDemoLogUpdate,
});
```

```html
<input type="range" id="log-scale"/>
```

*Example linear slider*
```javascript
const handleDemoLinearUpdate = (value) => {
    console.log(value);
};

const demoLinear = new LogSlider({
    id: 'linear-scale',
    min: 1,
    max: 1000,
    type: sliderTypes.LINEAR,
    showTab: true,
    inputHandler: handleDemoLinearUpdate,
    changeHandler: handleDemoLinearUpdate,
});
```

```html
<input type="range" id="linear-scale"/>
```
