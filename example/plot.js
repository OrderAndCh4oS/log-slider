const logValueInput = document.getElementById('log-value');
const logScaleInput = document.getElementById('log-scale-input');
const linearValueInput = document.getElementById('linear-scale-input');

const handleDemoLogUpdate = (log, value) => {
    logValueInput.value = log.toFixed(3);
    logScaleInput.value = value;
    plotData(); // CalcIt or some similar function.
};

const demoLog = new LogSlider({
    id: 'log-scale',
    min: 10,
    max: 10000,
    type: sliderTypes.LOG,
    steps: [10, 100, 1000, 2500, 5000, 7500, 10000],
    showTab: true,
    callback: handleDemoLogUpdate,
});

const handleDemoLinearUpdate = (value) => {
    linearValueInput.value = value;
    plotData(); // CalcIt or some similar function.
};

const demoLinear = new LogSlider({
    id: 'linear-scale',
    callback: handleDemoLinearUpdate,
});

logScaleInput.value = demoLog.value;
logScaleInput.addEventListener('change', function() {
    demoLog.value = Number(this.value);
});

logValueInput.value = demoLog.log.toFixed(3);
logValueInput.addEventListener('change', function() {
    demoLog.log = Number(this.value);
});

linearValueInput.value = demoLinear.value;
linearValueInput.addEventListener('change', function() {
    demoLinear.value = Number(this.value);
});

function plotData() {
    const data =  [
        plotLogData(10000, 'Fixed Log', 'rgb(255, 156, 156)'),
        plotLogData(demoLog.log, 'Dynamic Log', 'rgb(255, 56, 56)'),
        plotLinearData(1000, 'Fixed Linear', 'rgb(156, 255, 156)'),
        plotLinearData(demoLinear.value, 'Dynamic Linear', 'rgb(56, 155, 56)'),
    ];

    Plotly.react('plot', data);
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

const initialData = plotData(demoLog.log);

// Linear Plot
const layout = {
    title: 'Log Calc Plot',
    xaxis: {
        autorange: true,
    },
    yaxis: {
        autorange: true,
    },
};

Plotly.newPlot('plot', initialData, layout, {displayModeBar: false});

plotData();