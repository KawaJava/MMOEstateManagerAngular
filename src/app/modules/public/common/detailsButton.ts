import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-details-button',
    template: `
      <button mat-raised-button color="primary" [routerLink]="link">Szczegóły</button>
    `,
  styleUrls: ['\\details-button.component.scss']
  })
  export class DetailsButton {
    @Input() link!: any[];
  }
  