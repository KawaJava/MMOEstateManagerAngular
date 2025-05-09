import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { startWith, switchMap, map } from 'rxjs';
import { Page } from 'src/app/shared/page';
import { AdminPlayerReview } from '../model/adminPlayerReview';
import { AdminPlayerReviewsService } from '../service/admin-player-reviews-service.service';
import { AdminConfirmDialogService } from '../../admin-confirm-dialog.service';

@Component({
  selector: 'app-admin-player-reviews',
  templateUrl: './admin-player-reviews.component.html',
  styleUrls: ['./admin-player-reviews.component.scss']
})
export class AdminPlayerReviewsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<AdminPlayerReview>;

  displayedColumns: string[] = ['id', 'authorName', 'note', 'player', 'content', 'createdAt', 'accepted', 'actions'];
  data: AdminPlayerReview[] = [];
  totalElements = 0;

  constructor(
    private reviewService: AdminPlayerReviewsService,
    private dialogService: AdminConfirmDialogService
    ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(() =>
        this.reviewService.getReviews(this.paginator.pageIndex, this.paginator.pageSize)
      ),
      map((page: Page<AdminPlayerReview>) => {
        this.totalElements = page.totalElements;
        return page.content;
      })
    ).subscribe(data => this.data = data);
  }

  confirmDelete(element: AdminPlayerReview) {
      this.dialogService.openConfirmDialog("Czy na pewno chcesz trwale usunąć tę opinię?")
      .afterClosed()
      .subscribe(result => {
        if(result) {
          this.reviewService.deletePlayerReview(element.id)
            .subscribe(() => {
              this.data.forEach((value, index) => {
                if(element == value) {
                  this.data.splice(index, 1);
                  this.table.renderRows();
                }
              })
            });
        }
      });
    }
}
