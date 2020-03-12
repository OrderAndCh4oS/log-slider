const logValueInput = document.getElementById('log-value');
const logScaleInput = document.getElementById('log-scale-input');
const linearValueInput = document.getElementById('linear-scale-input');


const handleDemoLogUpdate = (value, log) => {
    logValueInput.value = log.toFixed(3);
    logScaleInput.value = value;
    const data = plotData();
    Plotly.react('plot', data);
    Plotly.react('plotTwo', data);
};

const handleDemoLinearUpdate = (value) => {
    linearValueInput.value = value;
    const data = plotData();
    Plotly.react('plot', data);
    Plotly.react('plotTwo', data);
};

const demoLog = new RangeSlider({
    id: 'log-scale',
    min: 100,
    max: 10000,
    type: sliderTypes.LOG,
    showTab: true,
    inputHandler: handleDemoLogUpdate,
    changeHandler: handleDemoLogUpdate,
});

const demoLinear = new RangeSlider({
    id: 'linear-scale',
    min: 1,
    max: 1000,
    type: sliderTypes.LINEAR,
    showTab: true,
    inputHandler: handleDemoLinearUpdate,
    changeHandler: handleDemoLinearUpdate,
});

logScaleInput.value = demoLog.value;
linearValueInput.value = demoLinear.value;

logScaleInput.addEventListener('change', function() {
    demoLog.value = this.value;
});

logValueInput.value = demoLog.log.toFixed(3);

logValueInput.addEventListener('change', function() {
    demoLog.log = Number(this.value);
});

function plotData() {
    return [
        plotLogData(10000, 'Fixed Log', 'rgb(255, 156, 156)'),
        plotLogData(demoLog.log, 'Dynamic Log', 'rgb(255, 56, 56)'),
        plotLinearData(1000, 'Fixed Linear', 'rgb(156, 255, 156)'),
        plotLinearData(demoLinear.value, 'Dynamic Linear', 'rgb(56, 155, 56)'),
    ];
}

function plotLogData(log, name, colour = 'rgb(16, 16, 16)') {
    const logValue = (v) => logScale(v, log, 100);

    const xs = [1];
    const ys = [logValue(1)];

    for(let i = 1; i < 1000; i++) {
        xs.push(i + 1);
        ys.push(logValue(i));
    }

    return {
        name,
        x: xs,
        y: ys,
        type: 'scatter',
        mode: 'lines',
        line: {
            color: colour,
            width: 2,
        },
    };
}

function plotLinearData(value, name, colour = 'rgb(16, 16, 16)') {

    const xs = [1];
    const ys = [1];

    for(let i = 1; i < 1000; i++) {
        xs.push(i + 1);
        ys.push((i * 5) * (value / 1000));
    }

    return {
        name,
        x: xs,
        y: ys,
        type: 'scatter',
        mode: 'lines',
        line: {
            color: colour,
            width: 2,
        },
    };
}

const layout = {
    title: 'Log Calc Plot',
    xaxis: {
        autorange: true,
    },
    yaxis: {
        autorange: true,
    },
};

const layoutTwo = {
    title: 'Log Calc Plot Two',
    xaxis: {
        type: 'log',
        autorange: true,
    },
    yaxis: {
        type: 'log',
        autorange: true,
    },
};

const initialData = plotData(demoLog.log);

Plotly.newPlot('plot', initialData, layout, {displayModeBar: false});
Plotly.newPlot('plotTwo', initialData, layoutTwo, {displayModeBar: false});
