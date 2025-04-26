import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chart, ChartConfiguration } from 'chart.js';
import { Observable, startWith, switchMap } from 'rxjs';
import { AdminCountryToAutocomplete } from 'src/app/modules/common/model/adminCountryToAutocomplete';
import { AdminCountryToAutocompleteService } from 'src/app/modules/common/service/AdminCountryToAutocomplete';
import { ChartStatsService } from '../gold-in-borough/ChartStatsService';

@Component({
  selector: 'app-players-is-country',
  templateUrl: './players-is-country.component.html',
  styleUrls: ['./players-is-country.component.scss']
})
export class PlayersIsCountryComponent implements OnInit {

  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  countryControl = new FormControl();
  filteredCountries: Observable<AdminCountryToAutocomplete[]> = new Observable();
  selectedCountryId: number | null = null;

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
          this.loadPlayerStats(country.id);
        }
      }
    )}

  displayCountryName = (country: AdminCountryToAutocomplete): string => {
    return country?.name || '';
  };
  chartData: ChartConfiguration<'bar'>['data'] = {
      labels: [],
      datasets: [
        { 
          label: 'Ilość gmin gracza w hrabstwie', 
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
    generateChart(labels: string[], data: number[]) {
      if (this.chart) {
        this.chart.destroy();
      }
  
      this.chart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Ilość gmin na gracza',
            data,
            backgroundColor: '#4A90E2'
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

    loadPlayerStats(countryId: number): void {
      this.goldService.getPlayersInCountry(countryId).subscribe(stats => {
        const labels = stats.map(s => s.playerName);
        const data = stats.map(s => s.boroughCount);
    
        this.chartData.labels = labels;
        this.chartData.datasets[0].data = data;
    
        this.generateChart(labels, data);
      });
    }

}
