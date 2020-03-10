const logValue = (v) => logScale(v, 10000, 100);

// var trace1 = {
//     x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//     y: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
//     type: 'scatter'
// };

var trace2 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    y: [logValue(0.0), logValue(0.1), logValue(0.2), logValue(0.3), logValue(0.4), logValue(0.5), logValue(0.6), logValue(0.7), logValue(0.8), logValue(0.9), logValue(1)],
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
        type: 'log',
        autorange: true
    },
    yaxis: {
        type: 'log',
        autorange: true
    }
};

Plotly.newPlot('plot', data, layout, {displayModeBar: false});
