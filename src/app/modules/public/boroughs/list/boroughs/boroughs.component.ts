import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/shared/page';
import { Borough } from '../../model/borough';
import { BoroughService } from '../../service/boroughService';

@Component({
  selector: 'app-boroughs',
  templateUrl: './boroughs.component.html',
  styleUrls: ['./boroughs.component.scss']
})
export class BoroughsComponent implements OnInit {

  boroughs!: Page<Borough>;
  pageSize = 12;
  currentPage = 0;
  totalPages = 0;
  pageNumbers: number[] = [];

  constructor(private boroughService: BoroughService) {}

  ngOnInit(): void {
    this.fetchBoroughs();
  }

  fetchBoroughs(): void {
    this.boroughService.getBoroughs(this.currentPage, this.pageSize).subscribe(data => {
      this.boroughs = data;
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
    this.fetchBoroughs();
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchBoroughs();
    }
  }

  nextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.fetchBoroughs();
    }
  }

}
