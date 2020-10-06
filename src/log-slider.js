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

const difference = (a, b) => a > b ? a - b : b - a;

const getClosest = (steps, value) => {
    let diffLast = Infinity;
    let closest = Infinity;
    for(const step of steps) {
        const diff = difference(step, value);
        if(diff > diffLast) break;
        diffLast = diff;
        closest = step;
    }
    return closest;
};

/**
 * Handles configuration of <input type="range" /> sliders
 */
class LogSlider {
    _result = 0;
    _id;
    _logMax;
    _logMin;
    _input;
    _type;
    _tabEl;
    _decimalPlaces;
    _steps;
    _callback;
    _wrapperEl;
    _messages;
    _stepMarkerContainerEl;
    _stepMarkerEls = [];

    /**
     * RangeSlider constructor
     *
     * @param {string} id The `id` attribute of the range slider.
     * @param {number=1} step Step increment of the range slider.
     * @param {number=1} min Minimum inputValue of the range slider
     * @param {number=1000} max Maximum inputValue of the range slider.
     * @param {number=500} value The initial inputValue of the range slider.
     * @param {'log'|'linear'} type Must be one of sliderTypes ie sliderTypes.LOG or sliderTypes.LINEAR.
     * @param {boolean=false} showTab
     * @param {number=0} decimalPlaces
     * @param {number[]|null} steps
     * @param {callback=} callback An onChange callback matching (inputValue, log) => {}
     *                                  log parameter only available if the type is sliderType.LOG.
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
            steps,
            callback = () => {},
        }) {
        this._id = id;
        this._messages = {
            elementNotFound: `No element found with id of ${this._id}`,
            isNotInputElement: `${this._id} is not an \`<input />\` tag`,
            isNotTypeRange: `${this._id} does not have \`type="range"\` set.`,
            notLogSliderGet: `${this._id} is not a log slider, you can't 'get' a log value. Change the type to sliderTypes.LOG`,
            notLogSliderSet: `${this._id} is not a log slider, you can't 'set' a log value. Change the type to sliderTypes.LOG`,
        };
        this._input = document.getElementById(id);
        this._step = this._setAttribute(step, 'step', 1);
        this._min = this._setAttribute(min, 'min', 1);
        this._max = this._setAttribute(max, 'max', 1000);
        this._logMin = this._min;
        this._logMax = this._max;
        this._type = this._setData(type, 'type', sliderTypes.LINEAR);
        this._showTab = this._setData(showTab, 'showTab', true);
        this._steps = this._setData(steps, 'steps', null);
        this._initialValue = this._setAttribute(value, 'value', 1);
        this._decimalPlaces = this._countDecimalPlaces(this._step);
        this._callback = callback;
        if(typeof this._steps === 'string') this._steps = this._steps
            .split(',')
            .map(x => Number(x));
        this._configureRangeInput();
        this._createDomElements();
        this._updateResult();
        this._snapToStep();
        this._updateTab();
        this.value = this._initialValue;
    }

    _countDecimalPlaces(value) {
        const arr = value.toString().split('.');
        if(arr.length > 1) return arr[1].length
        return 0;
    }

    get input() {
        return this._input;
    }

    get inputValue() {
        return this._input.value;
    }

    set inputValue(value) {
        this._input.value = value;
        this._handleInputEvent();
    }

    get value() {
        return this._result;
    }

    set value(value) {
        this._result = value;
        this._input.value = this.isLogSlider()
            ? inverseLogScale(
                this._result,
                this._logMax,
                this._logMin,
            )
            : this._result;
        this._updateResult();
        this._callback(this._result, this._input.value);
    }

    isLogSlider = () => this._type === sliderTypes.LOG;

    isLinearSlider = () => this._type === sliderTypes.LINEAR;

    reset = () => {this.value = this._initialValue};

    _configureRangeInput() {
        if(!this._input) {
            throw new Error(this._messages.elementNotFound);
        }
        if(!this._input instanceof HTMLInputElement) {
            throw new Error(this._messages.isNotInputElement);
        }
        if(this._input.type !== 'range') {
            throw new Error(this._messages.isNotTypeRange);
        }
        this._input.classList.add('slider');
        this._input.min = this.isLogSlider() ? 1 : this._min;
        this._input.max = this.isLogSlider() ? 1000 : this._max;
        this._input.step = this._step;
        this._input.value = this._initialValue;
        this._input.addEventListener('input', () => this._handleInputEvent());
        this._input.addEventListener('change', () => this._handleChangeEvent());
        window.addEventListener('resize', () => {
            this._updateStepMarkers();
            this._updateTab();
        });
    }

    _handleInputEvent() {
        this._updateResult();
        this._callback(this._result, this._input.value);
    }

    _handleChangeEvent() {
        this._snapToStep();
        this._updateTab();
        this._callback(this._result, this._input.value);
    }

    _snapToStep() {
        if(this._steps) {
            this._input.value = this.isLogSlider()
                ? inverseLogScale(
                    this._result,
                    this._logMax,
                    this._logMin,
                )
                : this._result;
        }
    }

    _updateResult() {
        this._result = this.isLogSlider()
            ? logScale(this.inputValue, this._logMax, this._logMin)
            : Number(this.inputValue);
        if(this._steps) this._result = getClosest(this._steps, this._result);
        if(this._showTab) this._updateTab();
    }

    _updateTab() {
        this._tabEl.innerText = (this._result.toFixed(this._decimalPlaces));
        this._tabEl.style.left = this._getLeft(this.inputValue, 8);
    }

    _getLeft(value, offset = 0) {
        const max = Number(this.isLogSlider() ? 1000 : this._max);
        const min = Number(this.isLogSlider() ? 1 : this._min);
        return (((value - Math.abs(min)) / max) * (this._wrapperEl.clientWidth - offset)) + (offset / 2) + 'px';
    }

    _createDomElements() {
        this._wrapperEl = this._createWrapper('slider--wrapper');
        this._input.parentNode.insertBefore(this._wrapperEl, this._input);
        this._inputWrapperEl = this._createWrapper('slider--input-wrapper');
        this._inputWrapperEl.append(this._input);
        this._wrapperEl.append(this._inputWrapperEl);
        if(this._showTab) {
            this._tabEl = this._createTab();
            this._wrapperEl.append(this._tabEl);
        }
        if(this._steps) {
            this._stepMarkerContainerEl = this._createStepMarkers();
            this._wrapperEl.append(this._stepMarkerContainerEl);
        }
    }

    _createWrapper(className) {
        const wrapper = document.createElement('div');
        wrapper.classList.add(className);
        wrapper.style.position = 'relative';
        return wrapper;
    }

    _createTab() {
        const tab = document.createElement('span');
        tab.classList.add('slider--tab');
        this._wrapperEl.style.paddingBottom = '12px';
        return tab;
    }

    _createStepMarkers() {
        const markerContainer = document.createElement('div');
        markerContainer.classList.add('slider--marker-container');
        for(const step of this._steps) {
            const marker = document.createElement('div');
            marker.classList.add('slider--marker');
            const leftValue = this.isLogSlider() ? inverseLogScale(step,
                this._logMax, this._logMin) : step;
            marker.style.left = this._getLeft(leftValue, 8);
            markerContainer.append(marker);
            this._stepMarkerEls.push(marker)
        }
        return markerContainer;
    }

    _updateStepMarkers() {
        for(let i = 0; i < this._stepMarkerEls.length; i++){
            let marker = this._stepMarkerEls[i];
            const leftValue = this.isLogSlider() ? inverseLogScale(this._steps[i],
                this._logMax, this._logMin) : this._steps[i];
            marker.style.left = this._getLeft(leftValue, 8);
        }
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
