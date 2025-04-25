import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, switchMap } from 'rxjs';
import { AdminBoroughToAutocomplete } from 'src/app/modules/common/model/adminBoroughToAutocomplete';
import { AdminBoroughToAutocompleteService } from 'src/app/modules/common/service/AdminBoroughToAutocompleteService';
import { ChartStatsService } from './ChartStatsService';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables); // dodaj to zaraz po importach



@Component({
  selector: 'app-gold-in-borough',
  templateUrl: './gold-in-borough.component.html',
  styleUrls: ['./gold-in-borough.component.scss']
})
export class GoldInBoroughComponent implements OnInit {

  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  boroughControl = new FormControl();
  filteredBoroughs: Observable<AdminBoroughToAutocomplete[]> = new Observable();
  selectedBoroughId: number | null = null;

  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { 
        label: 'Ilość złota', 
        data: [], 
        backgroundColor: '#ffd700'
      }
    ]
  };

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Złoto w gminie na przestrzeni czasu'
      }
    }
  };

  constructor(private boroughService: AdminBoroughToAutocompleteService,
    private goldService: ChartStatsService
  ) {}

  ngOnInit(): void {
    this.filteredBoroughs = this.boroughControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.boroughService.searchBoroughs(value || ''))
    )
    this.boroughControl.valueChanges.subscribe(value => {
      const borough = typeof value === 'string'
        ? null
        : value;

      if (borough && borough.id) {
        this.loadGoldStats(borough.id);
      }
    });;
  }
  loadGoldStats(boroughId: number): void {
    this.goldService.getGoldStatsByBorough(boroughId).subscribe(stats => {
      const labels = stats.map(s => s.date);
      const data = stats.map(s => s.amount);
  
      this.chartData.labels = labels;
      this.chartData.datasets[0].data = data;
  
      this.generateChart(labels, data);
    });
  }
  

  displayBoroughName = (borough: AdminBoroughToAutocomplete): string => {
    return borough?.name || '';
  };

  generateChart(labels: string[], data: number[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Złoto',
          data,
          backgroundColor: '#FFD700'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }
  
}