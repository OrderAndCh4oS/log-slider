const logScale = (value, max, min = 0) => {
    const minP = 1;
    const maxP = 1000;

    const minV = Math.log(min);
    const maxV = Math.log(max);

    const scale = (maxV - minV) / (maxP - minP);

    return Math.exp(minV + scale * (value - minP));
};

const inverseLogScale = (lg, max, min = 0) => {
    const minP = 1;
    const maxP = 1000;

    const minV = Math.log(min);
    const maxV = Math.log(max);

    const scale = (maxV - minV) / (maxP - minP);

    return (Math.log(lg) - minV) / scale + minP;
};

class LogSlider {
    _max = 10000;
    _min = 0;
    _log = 0;
    _changeHandler;
    _input;

    constructor({id, max, intervals = null, step = 1, min = 1, start = 500, changeHandler = () => {}}) {
        this._input = document.getElementById(id);
        this._input.addEventListener('change', this.handleChange);
        this._input.min = 1;
        this._input.max = 1000;
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
