# log-slider

https://sarcoma.github.io/range-slider/

## Setup

*Example log scaling slider*
```javascript
const handleDemoLogUpdate = (value, log) => {
    console.log(value, log);
};

const demoLog = new RangeSlider({
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

const demoLinear = new RangeSlider({
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
