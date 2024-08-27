import { Component, OnInit } from '@angular/core';
import { AdminCountryGeneralInfo } from './model/adminCountryGeneralInfo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminCountryService } from '../admin-country/admin-country.service';

@Component({
  selector: 'app-admin-country-update',
  templateUrl: './admin-country-update.component.html',
  styleUrls: ['./admin-country-update.component.scss']
})
export class AdminCountryUpdateComponent implements OnInit {

  country!: AdminCountryGeneralInfo;
  countryForm!: FormGroup;
  constructor(
    private router: ActivatedRoute,
    private adminCountryService: AdminCountryService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getCountry();

    this.countryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      slug: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  getCountry() {
    let id = Number (this.router.snapshot.params['id']);
    this.adminCountryService.getCountry(id)
    .subscribe(country => this.countryForm.setValue({
      name: country.name,
      slug: country.slug
  }));
  }

  submit() {{
    let id = Number (this.router.snapshot.params['id']);
    this.adminCountryService.updateAdminCountryGeneralInfo(id, this.countryForm.value)
    .subscribe(country => this.countryForm.setValue({
      name: country.name,
      slug: country.slug
  }));
  this.snackBar.open("Hrabstwo zostało zaktualizowane", '', {duration: 3000});
  }
  }
}
