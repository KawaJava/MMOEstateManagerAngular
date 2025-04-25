import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, switchMap } from 'rxjs';
import { AdminBoroughToAutocomplete } from 'src/app/modules/common/model/adminBoroughToAutocomplete';
import { AdminBoroughToAutocompleteService } from 'src/app/modules/common/service/AdminBoroughToAutocompleteService';

@Component({
  selector: 'app-gold-in-borough',
  templateUrl: './gold-in-borough.component.html',
  styleUrls: ['./gold-in-borough.component.scss']
})
export class GoldInBoroughComponent implements OnInit {

  boroughControl = new FormControl();
  filteredBoroughs: Observable<AdminBoroughToAutocomplete[]> = new Observable();

  constructor(private boroughService: AdminBoroughToAutocompleteService) {}

  ngOnInit(): void {
    this.filteredBoroughs = this.boroughControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.boroughService.searchBoroughs(value || ''))
    );
  }
}