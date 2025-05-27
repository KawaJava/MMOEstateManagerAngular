import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminBoroughAddService } from '../service/admin-borough-add.service';
import { AdminPlayerToAutocomplete } from '../../admin-register/model/adminPlayerToAutoComplete';

@Component({
  selector: 'app-admin-borough-change-leader',
  templateUrl: './admin-borough-change-leader.component.html',
  styleUrls: ['./admin-borough-change-leader.component.scss']
})
export class AdminBoroughChangeLeaderComponent implements OnInit {

  boroughForm!: FormGroup;

  filteredPlayers: AdminPlayerToAutocomplete[] = [];

  constructor(
    private router: ActivatedRoute,
    private adminBoroughService: AdminBoroughAddService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.boroughForm = this.formBuilder.group({
      actualLeaderId: ['', [Validators.required]]
    });
  }
  submit() {
    let id = Number(this.router.snapshot.params['id']);
    let newLeaderId = this.boroughForm.value.actualLeaderId;

    this.adminBoroughService.changeLeader(id, newLeaderId).subscribe({
      next: () => {
        this.snackBar.open("Wójt został zmieniony", '', { duration: 3000 });
      },
      error: (err) => {
        console.error('Błąd podczas zmiany wójta:', err);
        this.snackBar.open("Wystąpił błąd przy zmianie wójta", '', { duration: 3000 });
      }
    });
  }

  get leader(): FormControl {
  return this.boroughForm.get("actualLeaderId") as FormControl;
}

}
