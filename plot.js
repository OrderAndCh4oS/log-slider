const logValueInput = document.getElementById('log-value-input');
const logScaleInput = document.getElementById('log-scale-input');
const linearValueInput = document.getElementById('linear-scale-input');

const handleDemoLogUpdate = (log, value) => {
    logValueInput.value = log.toFixed(3);
    logScaleInput.value = value;
};

const demoLog = new LogSlider({
    id: 'log-scale',
    callback: handleDemoLogUpdate,
});

const handleDemoLinearUpdate = (value) => {
    linearValueInput.value = value;
};

const demoLinear = new LogSlider({
    id: 'linear-scale',
    callback: handleDemoLinearUpdate,
});

logScaleInput.value = demoLog.inputValue;
logScaleInput.addEventListener('change', function() {
    demoLog.inputValue = Number(this.value);
});

logValueInput.value = demoLog.value.toFixed(3);
logValueInput.addEventListener('change', function() {
    demoLog.value = Number(this.value);
});

linearValueInput.value = demoLinear.inputValue;
linearValueInput.addEventListener('change', function() {
    demoLinear.inputValue = Number(this.value);
});
