$(document).ready(function() {

  // when the graph div is clicked get request for the receipts 

  // data is then passed on to the chart as datasets

  $(".viewReceipts").on("click", function(event) {
    event.preventDefault();
  
    $('<canvas id="myChart" width="400" height="400"></canvas>').appendTo('.graphDiv');

    var ctx = document.getElementById('myChart');
    var rChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
            label: 'First dataset',
            data: [0, 20, 40, 50],
            borderColor: "rgb(75, 192, 192)",
            // backgroundColo: "rgb(173,255,47)",
        }],
        labels: ['January', 'February', 'March', 'April']
      },
      options: {
        legend: {
          display: false
        },
        xAxesID: "Total Cost",
        yAxesID: "Time",
        
        scales: {
              yAxes: [{ 
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  }); 

  });

});