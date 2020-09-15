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

const difference = (a, b) => a > b ? a - b : b - a;

let timer;

const snapToClosestStep = (steps, value, setValue) => {
    if(steps.includes(Number(value))) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
        let diffLast = Infinity;
        let closest = Infinity;
        for(const step of steps) {
            const diff = difference(step, value);
            if(diff > diffLast) break;
            diffLast = diff;
            closest = step;
        }
        setValue(closest);
    }, 250);
};

const sliderTypes = Object.freeze({
    LOG: 'log',
    LINEAR: 'linear',
});

/**
 * Handles configuration of <input type="range" /> sliders
 */
class LogSlider {
    _id;
    _log;
    _logMax;
    _logMin;
    _input;
    _type;
    _tab;
    _decimalPlaces;
    _steps;
    _inputHandler;
    _changeHandler;
    _wrapper;

    /**
     * RangeSlider constructor
     *
     * @param {string} id The `id` attribute of the range slider.
     * @param {number=1} step Step increment of the range slider.
     * @param {number=1} min Minimum value of the range slider
     * @param {number=1000} max Maximum value of the range slider.
     * @param {number=500} value The initial value of the range slider.
     * @param {'log'|'linear'} type Must be one of sliderTypes ie sliderTypes.LOG or sliderTypes.LINEAR.
     * @param {boolean=false} showTab
     * @param {number=0} decimalPlaces
     * @param {number[]|null} steps
     * @param {callback=} changeHandler An onChange callback matching (value, log) => {}
     *                                  log parameter only available if the type is sliderType.LOG.
     * @param {callback=} inputHandler An onInput callback matching (value, log) => {}
     *                                 log only available if type is sliderType.LOG.
     */
    constructor(
        {
            id,
            step,
            min,
            max,
            value,
            type,
            showTab,
            decimalPlaces,
            steps,
            changeHandler = () => {},
            inputHandler = () => {},
        }) {
        this._id = id;
        this._input = document.getElementById(id);
        this._step = this._setAttribute(step, 'step', 1);
        this._min = this._setAttribute(min, 'min', 1);
        this._max = this._setAttribute(max, 'max', 1000);
        this._initialValue = this._setAttribute(value, 'value', 500);
        this._type = this._setData(type, 'type', sliderTypes.LINEAR);
        this._showTab = this._setData(showTab, 'showTab', true);
        this._decimalPlaces = this._setData(decimalPlaces, 'decimalPlaces', 0);
        this._steps = this._setData(steps, 'steps', null);
        if(typeof this._steps === 'string') this._steps = this._steps.split(',')
            .map(x => Number(x));
        console.log(this._steps);
        this._initialiseLogValue();
        this._configureRangeInput();
        this._inputHandler = inputHandler;
        this._changeHandler = changeHandler;
        if(this._showTab) {
            this._wrapper = this._createWrapper();
            this._tab = this._createTab();
            this._updateDom();
            this._updateTab();
        }
    }

    get log() {
        if(!this.isLogSlider()) {
            throw new Error(
                `${this._id} is not a log slider, you can't get a log value. Change the type to sliderTypes.LOG`);
        }

        return this._log;
    }

    set log(value) {
        if(!this.isLogSlider()) {
            throw new Error(
                `${this._id} is not a log slider, you can't set a log value. Change the type to sliderTypes.LOG`);
        }
        this._log = Math.max(this._logMin, Math.min(value, this._logMax));
        this._input.value = inverseLogScale(this._log, this._logMax,
            this._logMin);
        this._changeHandler(this.value, this._log);
        this._updateTab();
    };

    get input() {
        return this._input;
    }

    get value() {
        return this._input.value;
    }

    set value(value) {
        this._input.value = value;
        this.isLogSlider()
            ? this._updateLog(this._changeHandler)
            : this._updateValue(this._changeHandler);
        this._updateTab();
    }

    isLogSlider = () => this._type === sliderTypes.LOG;

    isLinearSlider = () => this._type === sliderTypes.LINEAR;

    reset = () => {
        this.value = this._initialValue;
    };

    handleChange = () => {
        this.isLogSlider()
            ? this._updateLog(this._changeHandler)
            : this._updateValue(this._changeHandler);
        this._updateTab();
    };

    handleInput = () => {
        this.isLogSlider()
            ? this._updateLog(this._inputHandler)
            : this._updateValue(this._inputHandler);
        this._updateTab();
    };

    _initialiseLogValue() {
        if(this.isLogSlider()) {
            this._log = logScale(this._initialValue, this._max, this._min);
            this._logMax = this._max;
            this._logMin = this._min;
        }
    }

    _configureRangeInput() {
        if(!this._input) {
            throw new Error(`No element found with id of ${this._id}`);
        }
        if(!this._input instanceof HTMLInputElement) {
            throw new Error(`${this._id} is not an \`<input />\` tag`);
        }
        if(this._input.type !== 'range') {
            throw new Error(`${this._id} is not does \`type="range"\` set.`);
        }
        this._input.classList.add('range-slider');
        this._input.min = this._type === sliderTypes.LOG ? 1 : this._min;
        this._input.max = this._type === sliderTypes.LOG ? 1000 : this._max;
        this._input.step = this._step;
        this._input.value = this._initialValue;
        this._input.addEventListener('change', this.handleChange);
        this._input.addEventListener('input', this.handleInput);
    }

    _updateDom() {
        this._input.parentNode.insertBefore(this._wrapper, this._input);
        this._wrapper.append(this._input);
        this._wrapper.append(this._tab);
    }

    _createWrapper() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('range-slider--wrapper');
        wrapper.style.position = 'relative';
        return wrapper;
    }

    _createTab() {
        const tab = document.createElement('span');
        tab.classList.add('range-slider--tab');
        this._wrapper.style.paddingBottom = '12px';
        return tab;
    }

    _updateTab() {
        const value = Number(this.isLogSlider() ? this._log : this.value);
        const max = Number(this.isLogSlider() ? 1000 : this._max);
        this._tab.innerText = (value.toFixed(this._decimalPlaces));
        this._tab.style.left = ((this.value / max) *
            (this._wrapper.clientWidth - 8)) + 4 + 'px';
    }

    _updateLog(handler) {
        this.log = logScale(this.value, this._logMax, this._logMin);
        handler(this.value, this._log);
    }

    _updateValue(handler) {
        if(this._steps) {
            snapToClosestStep(this._steps, this.value, this._setValue(this));
            return;
        }
        handler(this.value);
    }

    _setValue(scope) {
        return (value) => {
            scope.value = value;
            scope._changeHandler(value);
            scope._inputHandler(value);
        };
    }

    _setAttribute(param, attribute, defaultValue) {
        return param !== undefined
            ? param
            : this._input.hasAttribute(attribute)
                ? this._input.getAttribute(attribute)
                : defaultValue;
    }

    _setData(param, dataKey, defaultValue) {
        return param !== undefined
            ? param
            : this._input.dataset[dataKey] !== undefined
                ? this._input.dataset[dataKey]
                : defaultValue;
    }
}
