import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AdminConfirmDialogService } from '../../admin-confirm-dialog.service';
import { AdminPlayerReview } from '../model/adminPlayerReview';
import { AdminPlayerReviewsService } from '../service/admin-player-reviews-service.service';

@Component({
  selector: 'app-admin-player-reviews-to-accept',
  templateUrl: './admin-player-reviews-to-accept.component.html',
  styleUrls: ['./admin-player-reviews-to-accept.component.scss']
})
export class AdminPlayerReviewsToAcceptComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<AdminPlayerReview>;

  displayedColumns: string[] = ['id', 'playerId', 'authorName', 'note', 'content', 'createdAt', 'accepted', 'actions'];
  data: AdminPlayerReview[] = [];
  totalElements = 0;

  constructor(
    private reviewService: AdminPlayerReviewsService,
    private dialogService: AdminConfirmDialogService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.reviewService.getReviewsToAccept().subscribe(data => this.data = data)

  }

  confirmDelete(element: AdminPlayerReview) {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz trwale usunąć tę opinię?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.reviewService.deletePlayerReview(element.id)
            .subscribe(() => {
              this.data.forEach((value, index) => {
                if (element == value) {
                  this.data.splice(index, 1);
                  this.table.renderRows();
                }
              })
            });
        }
      });
  }
  acceptReview(element: AdminPlayerReview) {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz zaakceptować tę opinię?")
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.reviewService.acceptPlayerReview(element.id)
            .subscribe(() => {
              this.data = this.data.filter(item => item.id !== element.id);
              this.table.renderRows();
            });
        }
      });
  }
  

}
