import { Component, OnInit } from '@angular/core';
import { Country } from '../../model/country';
import { CountryService } from '../../service/countryService';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/shared/page';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  countries!: Page<Country>;
  pageSize = 12;
  currentPage = 0;
  totalPages = 0;
  pageNumbers: number[] = [];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.fetchCountries();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.countryService.getCountries(this.currentPage, this.pageSize).subscribe(data => {
      this.countries = data;
      this.totalPages = Math.ceil(data.totalElements / this.pageSize);
      this.updatePageNumbers();
    });
  }

  updatePageNumbers(): void {
    if (!this.totalPages || this.totalPages < 1) {
      this.pageNumbers = [];
      return;
    }

    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, this.currentPage + 1 - half);
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    this.pageNumbers = [];
    for (let i = start; i <= end; i++) {
      this.pageNumbers.push(i);
    }
  }

  goToPage(page: number): void {
    this.currentPage = page - 1;
    this.fetchCountries();
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchCountries();
    }
  }

  nextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.fetchCountries();
    }
  }

}
