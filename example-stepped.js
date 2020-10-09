const logValueSteppedInput = document.getElementById('log-value-stepped-input');
const logScaleSteppedInput = document.getElementById('log-scale-stepped-input');
const linearValueSteppedInput = document.getElementById('linear-scale-stepped-input');

const demoLogStepped = new LogSlider({
    id: 'log-scale-stepped',
    callback: (log, value) => {
        logValueSteppedInput.value = log.toFixed(2);
        logScaleSteppedInput.value = value;
    },
});

logScaleSteppedInput.value = demoLogStepped.inputValue;
logScaleSteppedInput.addEventListener('change', function() {
    demoLogStepped.inputValue = Number(this.value);
});

logValueSteppedInput.value = demoLogStepped.value.toFixed(2);
logValueSteppedInput.addEventListener('change', function() {
    demoLogStepped.value = Number(this.value);
});

const demoLinearStepped = new LogSlider({
    id: 'linear-scale-stepped',
    callback: (value, inputValue) => {
        linearValueSteppedInput.value = value;
    },
});

linearValueSteppedInput.value = demoLinearStepped.inputValue;
linearValueSteppedInput.addEventListener('change', function() {
    demoLinearStepped.inputValue = Number(this.value);
});
