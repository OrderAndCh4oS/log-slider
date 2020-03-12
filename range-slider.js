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

const sliderTypes = Object.freeze({
    LOG: 'log',
    LINEAR: 'linear',
});

/**
 * Handles configuration of <input type="range" /> sliders
 */
class RangeSlider {
    _id;
    _log;
    _logMax;
    _logMin;
    _input;
    _type;
    _inputHandler;
    _changeHandler;

    /**
     * RangeSlider constructor
     *
     * @param {string} id The `id` attribute of the range slider.
     * @param {number=1} step Step increment of the range slider.
     * @param {number=1} min Minimum value of the range slider
     * @param {number=1000} max Maximum value of the range slider.
     * @param {number=500} start Start value of the range slider.
     * @param {'log'|'linear'} type Must be one of sliderTypes ie sliderTypes.LOG or sliderTypes.LINEAR.
     * @param {callback=} changeHandler An onChange callback matching (value, log) => {}
     *                                  log parameter only available if the type is sliderType.LOG.
     * @param {callback=} inputHandler An onInput callback matching (value, log) => {}
     *                                 log only available if type is sliderType.LOG.
     */
    constructor(
        {
            id,
            step = 1,
            min = 1,
            max = 1000,
            start = 500,
            type = sliderTypes.LINEAR,
            changeHandler = () => {},
            inputHandler = () => {},
        }) {
        this._id = id;
        this._type = type;
        if (this.isLogSlider()) {
            this._log = logScale(start, max, min);
            this._logMax = max;
            this._logMin = min;
        }
        this._input = document.getElementById(id);
        if (!this._input) {
            throw new Error(`No element found with id of ${id}`)
        }
        if (!this._input instanceof HTMLInputElement) {
            throw new Error(`${id} is not an \`<input />\` tag`)
        }
        if (this._input.type !== 'range') {
            throw new Error(`${id} is not does \`type="range"\` set.`)
        }
        this._input.min = type === sliderTypes.LOG ? 1 : min;
        this._input.max = type === sliderTypes.LOG ? 1000 : min;
        this._input.step = step;
        this._input.value = start;
        this._input.addEventListener('change', this.handleChange);
        this._input.addEventListener('input', this.handleInput);
        this._inputHandler = inputHandler;
        this._changeHandler = changeHandler;
    }

    get log() {
        if(!this.isLogSlider()) {
            throw new Error(`${this._id} is not a log slider, you can't get a log value. Change the type to sliderTypes.LOG`);
        }

        return this._log;
    }

    set log(value) {
        if(!this.isLogSlider()) {
            throw new Error(`${this._id} is not a log slider, you can't set a log value. Change the type to sliderTypes.LOG`);
        }

        this._log = value;
        this._input.value = inverseLogScale(value, this._logMax, this._logMin);
        this._changeHandler(this.value, this._log);
    };

    get input() {
        return this._input;
    }

    get value() {
        return this._input.value;
    }

    set value(value) {
        this._input.value = value;
        if(this.isLogSlider()) {
            this._log = logScale(value, this._logMax, this._logMin);
            this._changeHandler(this.value, this._log);
        } else {
            this._changeHandler(this.value);
        }
    }

    isLogSlider() {
        return this._type === sliderTypes.LOG;
    }

    isLinearSlider() {
        return this._type === sliderTypes.LINEAR;
    }

    handleChange = () => {
        this._log = logScale(this._input.value, this._logMax, this._logMin);
        this._changeHandler(this.value, this._log);
    };

    handleInput = () => {
        this._log = logScale(this._input.value, this._logMax, this._logMin);
        this._inputHandler(this.value, this._log);
    };
}

const logValueInput = document.getElementById('log-value');
const logScaleInput = document.getElementById('log-scale-input');


