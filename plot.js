const handleDemoUpdate = (value, log) => {
    logValueInput.value = log.toFixed(3);
    logScaleInput.value = value;
    const data = plotData(log);
    Plotly.react('plot', data);
    Plotly.react('plotTwo', data);
};

const demo = new RangeSlider({
    id: 'log-scale',
    min: 100,
    max: 10000,
    type: sliderTypes.LOG,
    showTab: true,
    inputHandler: handleDemoUpdate,
    changeHandler: handleDemoUpdate,
});

logScaleInput.value = demo.value;

logScaleInput.addEventListener('change', function() {
    demo.value = this.value;
});

logValueInput.value = demo.log.toFixed(3);

logValueInput.addEventListener('change', function() {
    demo.log = Number(this.value);
});

function plotData(log) {
    return [
        getData(10000, 'Fixed', 'rgb(156, 156, 156)'),
        getData(log, 'Dynamic'),
    ];
}

function getData(log, name, colour = 'rgb(16, 16, 16)') {
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

const initialData = plotData(demo.log);

Plotly.newPlot('plot', initialData, layout, {displayModeBar: false});
Plotly.newPlot('plotTwo', initialData, layoutTwo, {displayModeBar: false});
