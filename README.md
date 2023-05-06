[![NPM](https://img.shields.io/npm/v/@orderandchaos/log-slider.svg)](https://www.npmjs.com/package/@orderandchaos/log-slider)

# log-slider

https://OrderAndCh4oS.github.io/log-slider/

## Setup

### CDN 

Include these in your HTML somewhere (update the version number if a new version is available).

*script*  
`<script src="https://cdn.jsdelivr.net/npm/@orderandchaos/log-slider@3.0.4/lib/log-slider.js"></script>`

*stylesheet*  
`<link href="https://cdn.jsdelivr.net/npm/@orderandchaos/log-slider@3.0.4/lib/log-slider.css" rel="stylesheet"/>`

## Examples

### Log scale slider

*js*
```javascript
const handleDemoLogUpdate = (log, value) => {
    console.log(log, value);
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
*html*
```html
<input type="range" id="log-scale"/>
```

### Linear scale slider

*js*
```javascript
const handleDemoLinearUpdate = (value) => {
    console.log(value);
};

const demoLinear = new LogSlider({
    id: 'linear-scale',
    min: 1,
    max: 1000,
    showTab: true,
    callback: handleDemoLinearUpdate,
});
```
*html*
```html
<input type="range" id="linear-scale"/>
```

### Linear scale slider with steps

*js*
```javascript
const handleDemoLinearUpdate = (value) => {
    console.log(value);
};

const demoLinearStepped = new LogSlider({
    id: 'linear-scale',
    min: 1,
    max: 100,
    type: sliderTypes.LINEAR,
    steps: [1, 10, 25, 50, 100],
    showTab: true,
    callback: handleDemoLinearUpdate,
});
```

*html*
```html
<input type="range" id="linear-scale"/>
```

## Examples Using HTML Attributes

### Linear scale slider with steps
*html*
```html
<div class="form-field">
    <label for="linear-scale">Linear Scale</label>
    <input type="range"
           id="linear-scale"
           class="slider"
           step="1"
           min="1"
           max="100"
           data-steps="1,5,15,50,75,100"
           data-decimal-places="2"
           data-show-tab="true"
    />
</div>
```

*js*
```javascript
const demoLinear = new LogSlider({
    id: 'linear-scale',
    callback: (value) => {console.log(value)},
});
```

### Log scale slider
*html*
```html
<div class="form-field">
    <label for="log-scale">Log Scale</label>
    <input type="range"
           id="log-scale"
           class="slider"
           step="1"
           min="1"
           max="10000"
           data-type="log"
           data-show-tab="true"
    />
</div>
```

*js*
```javascript
const demoLog = new LogSlider({
    id: 'log-scale',
    callback: (log) => {console.log(log)},
});
```
