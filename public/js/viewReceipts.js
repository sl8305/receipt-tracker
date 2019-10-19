{/* <canvas id="myChart" width="400" height="400"></canvas> */}
var Chart = require('chart.js');

var ctx = document.getElementById('myChart');
var rChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
          label: 'First dataset',
          data: [0, 20, 40, 50]
      }],
      labels: ['January', 'February', 'March', 'April']
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
}); 