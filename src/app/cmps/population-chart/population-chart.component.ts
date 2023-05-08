import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { NationYearPopulationStats } from 'src/app/models/nation.model';
import { NationService } from 'src/app/services/nation.service';
// import { MarketPrice, Value } from 'src/app/models/graph.model';
// import { lastValueFrom } from 'rxjs';
Chart.register(...registerables);

@Component({
  selector: 'population-chart',
  templateUrl: './population-chart.component.html',
  styleUrls: ['./population-chart.component.scss']
})
export class PopulationChartComponent implements OnInit {
  constructor(private nationService: NationService) { }

  @Input() populationStats!: NationYearPopulationStats[]

  async ngOnInit() {

    // const reversedStats =
     let populationChanges = this.nationService.getPopulationChangeStats(this.populationStats)
      console.log(populationChanges)

    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: populationChanges.map(stat => stat.years),
        datasets: [{
          label: 'Population chart',
          data: populationChanges.map(stat => stat.populationChange),
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(145, 29, 132, 1)',
            
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(145, 29, 132, 1)',
            
            
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        
      }
    })
  }

}
