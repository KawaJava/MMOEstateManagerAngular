import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/modules/register/register.service';
import { AdminPlayerToAutocomplete } from '../model/adminPlayerToAutoComplete';
import { AdminplayerToAutocompleteService } from 'src/app/modules/common/service/AdminplayerToAutocompleteService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  registerError = false;
  registerErrorMessage = "";
  filteredPlayers: AdminPlayerToAutocomplete[] = [];


  constructor(private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private playerService: AdminplayerToAutocompleteService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['',
        [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9_.-]*$')
        ],
      ],
      password: ['',
        [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]+$')
        ],
      ],
      repeatPassword: ['', Validators.required],
      playerId: [null],
      role: 'ROLE_ADMIN',
    });
  }

  register() {
    if (this.registerForm.valid && this.isPasswordIdentical(this.registerForm.value)) {
      this.registerService.register(this.registerForm.value).subscribe({
        next: response => {
          this.registerErrorMessage = "Dodano nowego admina";
          this.snackBar.open("Dodano nowego admina", '', {duration: 3000});
          this.registerError = false;
        },
        error: err => {
          this.registerError = true;
          if (err.error?.message) {
            this.registerErrorMessage = err.error.message;
          } else {
            this.registerErrorMessage = "Coś poszło źle, spróbuj ponownie później";
          }
        }
      });
    } else {
      this.registerError = true;
      this.registerErrorMessage = "Popraw błędy w formularzu i spróbuj ponownie";
      this.registerForm.markAllAsTouched();
    }
  }

  private isPasswordIdentical(register: any): boolean{
    if(register.password === register.repeatPassword){
      this.registerError = false;
      return true;
    }
    this.registerError = true;
    this.registerErrorMessage = "Hasła nie są identyczne";
    return false;
  }

  onSearchPlayer(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    if (input.length >= 1) {
      this.playerService.searchPlayers(input).subscribe({
        next: players => {
          this.filteredPlayers = players;
        },
        error: err => {
          this.filteredPlayers = [];
        }
      });
    } else {
      this.filteredPlayers = [];
    }
  }
  
  displayPlayerName = (id: number): string => {
    const match = this.filteredPlayers.find(player => player.id === id);
    return match ? match.name : '';
  };
  
  get playerIdControl(): FormControl {
    return this.registerForm.get('playerId') as FormControl;
  }
  
  
}
