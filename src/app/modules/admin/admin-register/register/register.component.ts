import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/modules/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  registerError = false;
  registerErrorMessage = "";

  constructor(private formBuilder: FormBuilder,
    private registerService: RegisterService
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
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]+$') // przynajmniej jedna litera i jedna cyfra
        ],
      ],
      repeatPassword: ['', Validators.required],
      role: 'ROLE_ADMIN',
    });
  }

  register() {
    if (this.registerForm.valid && this.isPasswordIdentical(this.registerForm.value)) {
      this.registerService.register(this.registerForm.value).subscribe({
        next: response => {
          this.registerErrorMessage = "Dodano nowego admina";
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

}
