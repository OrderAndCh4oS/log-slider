const logValueInput = document.getElementById('log-value-input');
const logScaleInput = document.getElementById('log-scale-input');
const linearValueInput = document.getElementById('linear-scale-input');

const demoLog = new LogSlider({
    id: 'log-scale',
    callback: (log, value) => {
        logValueInput.value = log.toFixed(2);
        logScaleInput.value = value;
    },
});

logScaleInput.value = demoLog.inputValue;
logScaleInput.addEventListener('change', function() {
    demoLog.inputValue = Number(this.value);
});

logValueInput.value = demoLog.value.toFixed(2);
logValueInput.addEventListener('change', function() {
    demoLog.value = Number(this.value);
});

const demoLinear = new LogSlider({
    id: 'linear-scale',
    callback: (value, inputValue) => {
        linearValueInput.value = value;
    },
});

linearValueInput.value = demoLinear.inputValue;
linearValueInput.addEventListener('change', function() {
    demoLinear.inputValue = Number(this.value);
});
