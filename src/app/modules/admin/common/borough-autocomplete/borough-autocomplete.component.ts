import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AdminBoroughToAutocompleteService } from 'src/app/modules/common/service/AdminBoroughToAutocompleteService';
import { AdminBoroughToAutocomplete } from 'src/app/modules/common/model/adminBoroughToAutocomplete';

@Component({
  selector: 'app-borough-autocomplete',
  templateUrl: './borough-autocomplete.component.html',
  styleUrls: ['./borough-autocomplete.component.scss']
})
export class BoroughAutocompleteComponent implements OnInit {

  @Input() label: string = 'Gmina';
  @Input() control!: FormControl;

  filteredBoroughs: AdminBoroughToAutocomplete[] = [];

  constructor(private boroughService: AdminBoroughToAutocompleteService) { }

  ngOnInit(): void {
    this.boroughService.searchBoroughs('').subscribe({
      next: boroughs => this.filteredBoroughs = boroughs,
      error: () => this.filteredBoroughs = []
    });

    this.control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        const input = typeof value === 'string' ? value : '';
        return input.length >= 1
          ? this.boroughService.searchBoroughs(input)
          : [];
      })
    ).subscribe({
      next: boroughs => this.filteredBoroughs = boroughs,
      error: () => this.filteredBoroughs = []
    });
  }

  displayBoroughName = (id: number): string => {
    const borough = this.filteredBoroughs.find(p => p.id === id);
    return borough ? borough.name : '';
  };

}

