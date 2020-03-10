// const logScale = (value, max, min = 0) => {
//     const log = (-Math.log(1 - value) / Math.log(100)) * (max);
//     return log === Infinity ? max : log;
// };
//
// const inverseLogScale = (lg, max, min = 0) => 1 -
//     Math.pow(100, -lg / (max));

/**
 * https://www.stevenabbott.co.uk/practical-solubility/polymer-viscosity.php
 * Log Scale example
 */

const logScale = (value, max, min = 0) => {
    const x1 = 1 - value;
    const x2 = -Math.log(x1);
    const x3 = x2 / Math.log(100);
    const x4 = max - min;
    const x5 = x3 * x4;
    const x6 = x5 + min;
    return x6 === Infinity ? max : x6;
};

const inverseLogScale = (lg, max, min = 0) => {
    const x5 = lg - min;
    const x4 = x5 / (max - min);
    const x3 = x4 * Math.log(100);
    const x2 = Math.exp(-x3);
    return 1 - x2;
};

class LogSlider {
    _max = 10000;
    _min = 0;
    _log = 0;
    _changeHandler;
    _input;

    constructor({id, max, intervals = null, step = 0.01, min = 0, start = 0.5, changeHandler = () => {}}) {
        this._input = document.getElementById(id);
        this._input.addEventListener('change', this.handleChange);
        this._intervals = intervals || [min, max];
        this._input.min = 0;
        this._input.max = 1;
        this._input.step = step;
        this._max = max;
        this._min = min;
        this._input.value = start;
        this._log = logScale(start, max, min);
        this._changeHandler = changeHandler;
    }

    get log() {
        return this._log;
    }

    set log(value) {
        this._log = value;
        this._input.value = inverseLogScale(value, this._max, this._min);
        this._changeHandler(this._log, this.value);
    };

    get input() {
        return this._input;
    }

    get value() {
        return this._input.value
    }

    set value(value) {
        this._input.value = value;
        this._log = logScale(value, this._max, this._min);
        this._changeHandler(this._log, this.value);
    }

    handleChange = () => {
        this._log = logScale(this._input.value, this._max, this._min);
        this._changeHandler(this._log, this.value);
    }
}

const logValueInput = document.getElementById('log-value');
const logScaleInput = document.getElementById('log-scale-input');

const demo = new LogSlider({
    id: 'log-scale',
    min: 100,
    max: 10000,
    changeHandler: (log, value) => {
        logValueInput.value = log.toFixed(3);
        logScaleInput.value = value;
    }
});

logScaleInput.value = demo.value;

logScaleInput.addEventListener('change', function() {
    demo.value = this.value;
});

logValueInput.value = demo.log.toFixed(3);

logValueInput.addEventListener('change', function() {
    demo.log = Number(this.value);
});
