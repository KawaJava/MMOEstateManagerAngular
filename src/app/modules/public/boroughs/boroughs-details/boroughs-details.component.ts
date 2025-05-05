import { Component, OnInit } from '@angular/core';
import { Borough } from '../model/borough';
import { BoroughService } from '../service/boroughService';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-boroughs-details',
  templateUrl: './boroughs-details.component.html',
  styleUrls: ['./boroughs-details.component.scss']
})
export class BoroughsDetailsComponent implements OnInit {

  borough!: Borough;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private boroughService: BoroughService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.boroughService.getBoroughBySlug(slug).subscribe({
        next: (borough) => {
          this.borough = borough;
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      });
    }
  }
  goBack(): void {
    this.location.back();
  }

}
