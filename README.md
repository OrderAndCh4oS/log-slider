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
    callback: handleDemoLogUpdate,
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
    callback: handleDemoLinearUpdate,
});
```

```html
<input type="range" id="linear-scale"/>
```

*Example linear slider with steps*
```javascript
const handleDemoLinearUpdate = (value) => {
    console.log(value);
};

const demoLinear = new LogSlider({
    id: 'linear-scale',
    min: 1,
    max: 100,
    type: sliderTypes.LINEAR,
    steps: [1, 10, 25, 50, 100],
    showTab: true,
    callback: handleDemoLinearUpdate,
});
```

```html
<input type="range" id="linear-scale"/>
```
