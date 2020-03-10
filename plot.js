const logValue = (v) => logScale(v, 10000, 100);

// var trace1 = {
//     x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//     y: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
//     type: 'scatter'
// };

xs = [1];
ys = [logValue(0)];
for (let i = 1; i < 100; i++) {
    xs.push(i+1);
    ys.push(logValue(i / 100));
}

var trace2 = {
    x: xs,
    y: ys,
    type: 'scatter',
    mode: 'lines+markers',
    line: {
        color: 'rgb(16,16,16)',
        width: 2
    }
};

var data = [trace2];

var layout = {
    title: 'Log Calc Plot',
    xaxis: {
        autorange: true
    },
    yaxis: {
        autorange: true
    }
};

var layoutTwo = {
    title: 'Log Calc Plot Two',
    xaxis: {
        type: 'log',
        autorange: true
    },
    yaxis: {
        type: 'log',
        autorange: true
    }
};

Plotly.newPlot('plot', data, layout, {displayModeBar: false});
Plotly.newPlot('plotTwo', data, layoutTwo, {displayModeBar: false});
