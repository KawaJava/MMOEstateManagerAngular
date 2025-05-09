import { Component, OnInit } from '@angular/core';
import { AdminBoroughGeneralInfo } from '../model/adminBoroughGeneralInfo';
import { AdminCountry } from '../../admin-country/model/adminCountry';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminHistoricalSheriffsFilteredService } from '../../admin-historical-sheriffs-filtered/admin-historical-sheriffs-filtered.service';
import { AdminBoroughAddService } from '../service/admin-borough-add.service';

@Component({
  selector: 'app-admin-borough-update',
  templateUrl: './admin-borough-update.component.html',
  styleUrls: ['./admin-borough-update.component.scss']
})
export class AdminBoroughUpdateComponent implements OnInit {

  borough!: AdminBoroughGeneralInfo;
  boroughForm!: FormGroup;
  countries: Array<AdminCountry> = [];

  constructor(
    private router: ActivatedRoute,
    private adminBoroughAddService: AdminBoroughAddService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private adminHistoricalSheriffsFilteredService: AdminHistoricalSheriffsFilteredService
  ) { }

  ngOnInit(): void {
    this.getCountries();
    this.getBorough();

    this.boroughForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      slug: ['', [Validators.required, Validators.minLength(3)]],
      countryId: ['', [Validators.required]]
    });
  }

  getBorough() {
    let id = Number (this.router.snapshot.params['id']);
    this.adminBoroughAddService.getBorough(id)
    .subscribe(borough => this.boroughForm.setValue({
      name: borough.name,
      slug: borough.slug,
      countryId: borough.countryId,
  }));
}

  getCountries() {
    this.adminHistoricalSheriffsFilteredService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  submit() {{
    let id = Number (this.router.snapshot.params['id']);
    
    this.adminBoroughAddService.updateAdminBoroughGeneralInfo(id, this.boroughForm.value)
    .subscribe(borough => this.boroughForm.setValue({
      name: borough.name,
      slug: borough.slug,
      countryId: borough.countryId
  }));
  this.snackBar.open("Gmina została zaktualizowana", '', {duration: 3000});
  }}

  get name() {
    return this.boroughForm.get("name");
  }

  get slug() {
    return this.boroughForm.get("slug");
  }

  get country() {
    return this.boroughForm.get("countryId");
  }

}
