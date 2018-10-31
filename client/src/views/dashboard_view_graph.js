const PubSub = require('../helpers/pub_sub.js');

const Chart2 = function (chartData) {
  this.chartData = chartData;
};

Chart2.prototype.drawChart = function(){
  var data = new google.visualization.arrayToDataTable(this.chartData);
  var options = {
         title: '52 Week Portfolio Gain\(Loss)',
         hAxis: {title: '',  titleTextStyle: {color: '#333'}},
         vAxis: {minValue: 0},
         legend: false

       };

       var chart = new google.visualization.LineChart(document.getElementById('gainChart'));
       chart.draw(data, options);

};

Chart2.prototype.bindEvents = function () {
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(this.drawChart.bind(this));

};

module.exports = Chart2;
