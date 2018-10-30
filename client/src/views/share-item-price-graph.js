const PubSub = require('../helpers/pub_sub.js');

const Chart = function () {
};

Chart.prototype.drawChart = function(){
  var data = new google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
     ['2013',  1000,      400],
     ['2014',  1170,      460],
     ['2015',  660,       1120],
     ['2016',  1030,      540]
  ]);

  var options = {
         title: 'Company Performance',
         hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
         vAxis: {minValue: 0},
         legend: null
       };

  var chart = new google.visualization.AreaChart(document.getElementById('chart'));
  chart.draw(data, options);
};


Chart.prototype.bindEvents = function () {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(this.drawChart);
};



module.exports = Chart;
