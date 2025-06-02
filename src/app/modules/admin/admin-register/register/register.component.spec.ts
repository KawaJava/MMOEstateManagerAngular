import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminplayerToAutocompleteService } from 'src/app/modules/common/service/AdminplayerToAutocompleteService';
import { RegisterService } from 'src/app/modules/register/register.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockRegisterService: jasmine.SpyObj<RegisterService>;
  let mockPlayerService: jasmine.SpyObj<AdminplayerToAutocompleteService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const registerServiceSpy = jasmine.createSpyObj('RegisterService', ['register']);
    const playerServiceSpy = jasmine.createSpyObj('AdminplayerToAutocompleteService', ['searchPlayers']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: RegisterService, useValue: registerServiceSpy },
        { provide: AdminplayerToAutocompleteService, useValue: playerServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    mockRegisterService = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
    mockPlayerService = TestBed.inject(AdminplayerToAutocompleteService) as jasmine.SpyObj<AdminplayerToAutocompleteService>;
    mockSnackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.get('username')?.value).toBe('');
    expect(component.registerForm.get('password')?.value).toBe('');
    expect(component.registerForm.get('repeatPassword')?.value).toBe('');
    expect(component.registerForm.get('playerId')?.value).toBeNull();
    expect(component.registerForm.get('role')?.value).toBe('ROLE_ADMIN');
  });

  it('should invalidate form when username is empty', () => {
    const usernameControl = component.registerForm.get('username');
    usernameControl?.setValue('');
    usernameControl?.markAsTouched();

    expect(usernameControl?.hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should invalidate form when username is too short', () => {
    const usernameControl = component.registerForm.get('username');
    usernameControl?.setValue('abc');
    usernameControl?.markAsTouched();

    expect(usernameControl?.hasError('minlength')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should invalidate form when username is too long', () => {
    const usernameControl = component.registerForm.get('username');
    usernameControl?.setValue('a'.repeat(21));
    usernameControl?.markAsTouched();

    expect(usernameControl?.hasError('maxlength')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should invalidate form when username contains invalid characters', () => {
    const usernameControl = component.registerForm.get('username');
    usernameControl?.setValue('user@name');
    usernameControl?.markAsTouched();

    expect(usernameControl?.hasError('pattern')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should validate username when it meets all requirements', () => {
    const usernameControl = component.registerForm.get('username');
    usernameControl?.setValue('validUser123');
    usernameControl?.markAsTouched();

    expect(usernameControl?.valid).toBeTruthy();
  });

  it('should invalidate form when password is empty', () => {
    const passwordControl = component.registerForm.get('password');
    passwordControl?.setValue('');
    passwordControl?.markAsTouched();

    expect(passwordControl?.hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should invalidate form when password is too short', () => {
    const passwordControl = component.registerForm.get('password');
    passwordControl?.setValue('Pass123');
    passwordControl?.markAsTouched();

    expect(passwordControl?.hasError('minlength')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should invalidate form when password does not contain letters and numbers', () => {
    const passwordControl = component.registerForm.get('password');
    passwordControl?.setValue('password');
    passwordControl?.markAsTouched();

    expect(passwordControl?.hasError('pattern')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should validate password when it meets all requirements', () => {
    const passwordControl = component.registerForm.get('password');
    passwordControl?.setValue('ValidPassword123');
    passwordControl?.markAsTouched();

    expect(passwordControl?.valid).toBeTruthy();
  });

  it('should invalidate form when repeat password is empty', () => {
    const repeatPasswordControl = component.registerForm.get('repeatPassword');
    repeatPasswordControl?.setValue('');
    repeatPasswordControl?.markAsTouched();

    expect(repeatPasswordControl?.hasError('required')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should show password mismatch error when passwords do not match', () => {
    component.registerForm.patchValue({
      password: 'Password123',
      repeatPassword: 'DifferentPassword123'
    });
    
    const repeatPasswordControl = component.registerForm.get('repeatPassword');
    repeatPasswordControl?.markAsTouched();
    repeatPasswordControl?.updateValueAndValidity();

    expect(repeatPasswordControl?.hasError('passwordMismatch')).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should not show password mismatch error when passwords match', () => {
    component.registerForm.patchValue({
      password: 'Password123',
      repeatPassword: 'Password123'
    });
    
    const repeatPasswordControl = component.registerForm.get('repeatPassword');
    repeatPasswordControl?.markAsTouched();
    repeatPasswordControl?.updateValueAndValidity();

    expect(repeatPasswordControl?.hasError('passwordMismatch')).toBeFalsy();
  });

  it('should validate entire form when all fields are correct', () => {
    component.registerForm.patchValue({
      username: 'validUser123',
      password: 'ValidPassword123',
      repeatPassword: 'ValidPassword123',
      playerId: 1,
      role: 'ROLE_ADMIN'
    });

    component.registerForm.markAllAsTouched();
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('should call register service on successful form submission', () => {
    const mockResponse = { success: true };
    mockRegisterService.register.and.returnValue(of(mockResponse));

    const formData = {
      username: 'validUser123',
      password: 'ValidPassword123',
      repeatPassword: 'ValidPassword123',
      playerId: 1,
      role: 'ROLE_ADMIN'
    };

    component.registerForm.patchValue(formData);

    component.register();
    expect(mockRegisterService.register).toHaveBeenCalledWith(formData);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Dodano nowego admina', '', { duration: 3000 });
  });

  it('should handle registration error with custom message', () => {
    const errorResponse = { error: { message: 'Użytkownik już istnieje' } };
    mockRegisterService.register.and.returnValue(throwError(errorResponse));

    component.registerForm.patchValue({
      username: 'validUser123',
      password: 'ValidPassword123',
      repeatPassword: 'ValidPassword123',
      playerId: 1,
      role: 'ROLE_ADMIN'
    });

    component.register();

    expect(component.registerError).toBeTruthy();
    expect(component.registerErrorMessage).toBe('Użytkownik już istnieje');
  });

  it('should handle registration error with default message', () => {
    const errorResponse = { error: {} };
    mockRegisterService.register.and.returnValue(throwError(errorResponse));

    component.registerForm.patchValue({
      username: 'validUser123',
      password: 'ValidPassword123',
      repeatPassword: 'ValidPassword123',
      playerId: 1,
      role: 'ROLE_ADMIN'
    });

    component.register();

    expect(component.registerError).toBeTruthy();
    expect(component.registerErrorMessage).toBe('Coś poszło źle, spróbuj ponownie później');
  });

  it('should not submit form when invalid and show error message', () => {
    component.registerForm.patchValue({
      username: '',
      password: '',
      repeatPassword: '',
      playerId: 1,
      role: 'ROLE_ADMIN'
    });

    component.register();

    expect(mockRegisterService.register).not.toHaveBeenCalled();
    expect(component.registerError).toBeTruthy();
    expect(component.registerErrorMessage).toBe('Popraw błędy w formularzu i spróbuj ponownie');
  });

  it('should reset form after successful registration', () => {
    const mockResponse = { success: true };
    mockRegisterService.register.and.returnValue(of(mockResponse));

    component.registerForm.patchValue({
      username: 'validUser123',
      password: 'ValidPassword123',
      repeatPassword: 'ValidPassword123',
      playerId: 1,
      role: 'ROLE_ADMIN'
    });

    component.register();

    expect(component.registerForm.get('username')?.value).toBe(null);
    expect(component.registerForm.get('password')?.value).toBe(null);
    expect(component.registerForm.get('repeatPassword')?.value).toBe(null);
    expect(component.registerForm.get('role')?.value).toBe('ROLE_ADMIN');
  });

  it('should search players when input length is greater than 0', () => {
    const mockPlayers = [
      { id: 1, name: 'Player1' },
      { id: 2, name: 'Player2' }
    ];
    mockPlayerService.searchPlayers.and.returnValue(of(mockPlayers));

    const mockEvent = {
      target: { value: 'test' }
    } as any;

    component.onSearchPlayer(mockEvent);

    expect(mockPlayerService.searchPlayers).toHaveBeenCalledWith('test');
    expect(component.filteredPlayers).toEqual(mockPlayers);
  });

  it('should clear filtered players when search input is empty', () => {
    const mockEvent = {
      target: { value: '' }
    } as any;

    component.onSearchPlayer(mockEvent);

    expect(mockPlayerService.searchPlayers).not.toHaveBeenCalled();
    expect(component.filteredPlayers).toEqual([]);
  });

  it('should display correct player name by id', () => {
    component.filteredPlayers = [
      { id: 1, name: 'Player1' },
      { id: 2, name: 'Player2' }
    ];

    const result = component.displayPlayerName(1);
    expect(result).toBe('Player1');
  });

  it('should return empty string for non-existent player id', () => {
    component.filteredPlayers = [
      { id: 1, name: 'Player1' }
    ];

    const result = component.displayPlayerName(999);
    expect(result).toBe('');
  });

  it('should update repeat password validation when password changes', () => {
    component.registerForm.patchValue({
      password: 'Password123',
      repeatPassword: 'DifferentPassword123'
    });
    
    const repeatPasswordControl = component.registerForm.get('repeatPassword');
    repeatPasswordControl?.markAsTouched();
    repeatPasswordControl?.updateValueAndValidity();
    
    expect(repeatPasswordControl?.hasError('passwordMismatch')).toBeTruthy();

    component.registerForm.patchValue({
      password: 'DifferentPassword123'
    });

    expect(repeatPasswordControl?.hasError('passwordMismatch')).toBeFalsy();
  });
});
