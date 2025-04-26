import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chart, ChartConfiguration } from 'chart.js';
import { Observable, share, startWith, switchMap } from 'rxjs';
import { AdminCountryToAutocomplete } from 'src/app/modules/common/model/adminCountryToAutocomplete';
import { AdminCountryToAutocompleteService } from 'src/app/modules/common/service/AdminCountryToAutocomplete';
import { ChartStatsService } from '../gold-in-borough/ChartStatsService';

@Component({
  selector: 'app-clans-is-country',
  templateUrl: './clans-is-country.component.html',
  styleUrls: ['./clans-is-country.component.scss']
})
export class ClansIsCountryComponent implements OnInit {

  @ViewChild('doughnutCanvas', { static: false }) doughnutCanvas!: ElementRef<HTMLCanvasElement>;


  chart!: Chart<'doughnut'>;
    countryControl = new FormControl();
    filteredCountries: Observable<AdminCountryToAutocomplete[]> = new Observable();
    selectedCountryId: number | null = null;

    chartData: ChartConfiguration<'doughnut'>['data'] = {
      labels: [],
      datasets: [
        {
          label: 'Udział klanów',
          data: [],
          backgroundColor: [
            '#4A90E2',
            '#50E3C2',
            '#F5A623',
            '#B8E986'
          ]
        }
      ]
    };
  
    chartOptions: ChartConfiguration<'doughnut'>['options'] = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Podział wpływów klanów'
        }
      }
    };
  
    constructor(
        private countryService: AdminCountryToAutocompleteService,
        private goldService: ChartStatsService
      ) { }

  ngOnInit(): void {
        this.filteredCountries = this.countryControl.valueChanges.pipe(
          startWith(''),
          switchMap(value => this.countryService.searchPlayers(value || ''))
        )
        this.countryControl.valueChanges.subscribe(value => {
          const country = typeof value === 'string'
            ? null
            : value;
    
          if (country && country.id) {
            this.loadClanShares(country.id);
          }
        }
      )}

  displayCountryName = (country: AdminCountryToAutocomplete): string => {
    return country?.name || '';
  };
  
  generateChart(labels: string[], data: number[]): void {
    if (!this.doughnutCanvas || !this.doughnutCanvas.nativeElement) {
      console.error('Canvas not ready yet!');
      return;
    }
  
    if (this.chart) {
      this.chart.destroy();
    }
  
    this.chart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          label: 'Udział klanów',
          data,
          backgroundColor: this.chartData.datasets[0].backgroundColor
        }]
      },
      options: this.chartOptions
    });
  }

  loadClanShares(countryId: number): void {
    this.goldService.getClansInCountry(countryId).subscribe(stats => {
      const labels = stats.map(s => s.clanName);
      const data = stats.map(s => s.percentage);

      this.chartData.labels = labels;
      this.chartData.datasets[0].data = data;

      setTimeout(() => {
        this.generateChart(labels, data);
      }, 0);
    });
  }

}
