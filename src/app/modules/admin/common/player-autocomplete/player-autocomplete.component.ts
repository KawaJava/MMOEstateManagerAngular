import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AdminplayerToAutocompleteService } from 'src/app/modules/common/service/AdminplayerToAutocompleteService';
import { AdminPlayerToAutocomplete } from '../../admin-register/model/adminPlayerToAutoComplete';

@Component({
  selector: 'app-player-autocomplete',
  templateUrl: './player-autocomplete.component.html',
  styleUrls: ['./player-autocomplete.component.scss']
})
export class PlayerAutocompleteComponent implements OnInit {

  @Input() label: string = 'Gracz';
  @Input() control!: FormControl;

  filteredPlayers: AdminPlayerToAutocomplete[] = [];

  constructor(private playerService: AdminplayerToAutocompleteService) {}

  ngOnInit(): void {
    this.playerService.searchPlayers('').subscribe({
    next: players => this.filteredPlayers = players,
    error: () => this.filteredPlayers = []
  });

    this.control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        const input = typeof value === 'string' ? value : '';
        return input.length >= 1
          ? this.playerService.searchPlayers(input)
          : [];
      })
    ).subscribe({
      next: players => this.filteredPlayers = players,
      error: () => this.filteredPlayers = []
    });
  }

  displayPlayerName = (id: number): string => {
    const player = this.filteredPlayers.find(p => p.id === id);
    return player ? player.name : '';
  };

}
