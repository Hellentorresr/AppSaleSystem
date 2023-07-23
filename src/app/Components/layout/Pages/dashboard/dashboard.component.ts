import { Component, OnInit } from '@angular/core';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

import { UtilityService } from 'src/app/Reusable/utility.service';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //properties
  totalIncome: string = '0';
  salesTotal: string = '0';
  totalProducts: string = '0';

  constructor(private _dashboardService: DashboardService, private _util: UtilityService) { }

  ngOnInit(): void {
    //API calling
    this._dashboardService.List().subscribe({
      next: (data) => {
        if (data.status) {
          this.totalIncome = data.value.totalIncome;
          this.salesTotal = data.value.totalSales;
          this.totalProducts = data.value.totalProducts;

          const arrayData: any[] = data.value.saleLastWeek;
          //console.log(arrayData);
          const tempLabel = arrayData.map(d => d.date);
          const tempData = arrayData.map(d => d.total);
          //console.log(tempLabel, tempData)

          this.showGrafic(tempLabel, tempData);
        }
      },

      error: () => this._util.showAlert('No data found', 'Upps')
    })
  }

  //grafic expects tags and data
  showGrafic(labelGrafic: any[], dataGrafic: any[]) {
    const colors = ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'];

    const chartBars = new Chart('chartBars', {
      type: 'bar',
      data: {
        labels: labelGrafic,
        datasets: [{
          label: '# of Sale',
          data: dataGrafic,
          backgroundColor: colors,
          borderColor: colors.map(color => color.replace('0.2', '1')), // Use the same colors for borders 
          borderWidth: 1
        }]
      },

      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
