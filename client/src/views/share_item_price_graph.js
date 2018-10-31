const PubSub = require('../helpers/pub_sub.js');

const Chart = function (chartData) {
  this.chartData = chartData;
};

Chart.prototype.drawChart = function(){
  var data = new google.visualization.arrayToDataTable(this.chartData);
  var options = {
         title: '52 Week Share Price',
         hAxis: {title: '',  titleTextStyle: {color: '#333'}},
         vAxis: {minValue: 0},
         legend: false

       };

  var chart = new google.visualization.LineChart(document.getElementById('chart'));
  chart.draw(data, options);

  var gainChart = new google.visualization.LineChart(document.getElementById('gainChart'));
  gainChart.draw(data, options);

};

Chart.prototype.bindEvents = function () {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(this.drawChart.bind(this));
  // google.charts.setOnLoadCallback(() => {
  //   var data = new google.visualization.arrayToDataTable(this.chartData);
  //   console.log("craigs effort", this.chartData);
  //   var options = {
  //          title: 'Company Performance',
  //          hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
  //          vAxis: {minValue: 0},
  //          legend: null
  //        };
  //
  //   var chart = new google.visualization.LineChart(document.getElementById('chart'));
  //   chart.draw(data, options);
  // });
};

module.exports = Chart;
