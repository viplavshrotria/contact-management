import { Component } from "@angular/core";
import * as Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
highcharts3d(Highcharts);

@Component({
  selector: "app-home",
  templateUrl: "./homechart.component.html",
  styleUrls: ["./app.component.scss"]
})
export class HomechartComponent {
  data = [{
    name:'Engagement Index',
    color:'yellow',
    data: [2.5,2.75,3,3.25,3.5,3.75]
    }, {
    name:'sales',
    color:'skyblue',
    data: [5,7,9,13,18,25]
    },{
    name:'Operational Efficiency',
    color:'orange',
    data: [0.6,0.65,0.7,0.75,0.8,0.85]
    },{
    name:'Innovation index',
    color:'gray',
    data: [3,3,3.5,3.5,3.75,4]
  }];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    credits:{
      enabled:false
    },
    title: {
        text: 'Operation efficiency vs cultural Parameters'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },
    series: [{
        type: 'pie',
        name: 'Browser share',
        colors: [
        'yellow',
        'skyblue',
        'orange',
        'gray'
        ],
        data: [
          ['Manager effectivees index',100],
          ['Engagement index', 1000],
          ['Teamwork Index', 800],
          ['Psychlogial safety index', 800]
        ]
    }]
  };

  chartOptions2: Highcharts.Options = {
      xAxis: {
          categories: ['1', '2', '3', '4', '5', '6']
      },
      title: {
        text: 'Business outcome vs cultural index'
      },
      plotOptions: {
          series: {
              marker: {
                  radius: 8,
                  symbol:'circle'
              }
          }
      },
      credits:{
      enabled:false
    },
      series: [{
        name:'Engagement Index',
        type: 'line',
        color:'yellow',
        data: [2.5,2.75,3,3.25,3.5,3.75]
        }, {
        name:'sales',
        type: 'line',
        color:'skyblue',
        data: [5,7,9,13,18,25]
        },{
        name:'Operational Efficiency',
        type: 'line',
        color:'orange',
        data: [0.6,0.65,0.7,0.75,0.8,0.85]
        },{
        name:'Innovation index',
        type: 'line',
        color:'gray',
        data: [3,3,3.5,3.5,3.75,4]
      }]
  };


  title = 'Engagement dashboard';
}
