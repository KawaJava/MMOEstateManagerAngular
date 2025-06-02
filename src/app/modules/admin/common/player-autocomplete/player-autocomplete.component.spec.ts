import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PlayerAutocompleteComponent } from './player-autocomplete.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AdminplayerToAutocompleteService } from 'src/app/modules/common/service/AdminplayerToAutocompleteService';
import { delay, of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('PlayerAutocompleteComponent', () => {
  let component: PlayerAutocompleteComponent;
  let fixture: ComponentFixture<PlayerAutocompleteComponent>;
  let mockService: jasmine.SpyObj<AdminplayerToAutocompleteService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('AdminCountryToAutocompleteService', ['searchPlayers']);
    mockService.searchPlayers.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [PlayerAutocompleteComponent],
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: AdminplayerToAutocompleteService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerAutocompleteComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
    mockService.searchPlayers.calls.reset();

  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchPlayers with correct input after debounce', fakeAsync(() => {
    const players = [{ id: 1, name: 'Player1' },];
    mockService.searchPlayers.and.returnValue(of(players));

    component.control.setValue('Pla');
    tick(300);
    fixture.detectChanges();

    expect(mockService.searchPlayers).toHaveBeenCalledWith('Pla');
    expect(component.filteredPlayers).toEqual(players);
  }));

  it('should not call searchPlayers for input shorter than 1 character', fakeAsync(() => {
    component.control.setValue('');
    tick(300);
    expect(mockService.searchPlayers).not.toHaveBeenCalled();
    expect(component.filteredPlayers).toEqual([]);
  }));

  it('should handle non-string input gracefully', fakeAsync(() => {
    component.control.setValue({ id: 1 });
    tick(300);
    expect(mockService.searchPlayers).not.toHaveBeenCalled();
    expect(component.filteredPlayers).toEqual([]);
  }));

  it('should handle error from searchPlayers gracefully', fakeAsync(() => {
    mockService.searchPlayers.and.returnValue(throwError(() => new Error('Service failed')));
    component.control.setValue('Fail');
    tick(300);
    expect(component.filteredPlayers).toEqual([]);
  }));

  it('should return correct player name in displayPlayerName', () => {
    component.filteredPlayers = [
      { id: 1, name: 'Player1' },
      { id: 2, name: 'Player2' }
    ];

    expect(component.displayPlayerName(2)).toBe('Player2');
    expect(component.displayPlayerName(3)).toBe('');
  });

  it('should render required validation error when touched and invalid', fakeAsync(() => {
    component.label = 'Gracz';
    component.control = new FormControl('');
    component.control.setErrors({ required: true });
    component.control.markAsTouched();
    component.control.markAsDirty();

    component.ngOnInit();
    fixture.detectChanges();
    tick(300);

    const errorEl = fixture.debugElement.query(By.css('div div'));
    expect(errorEl).toBeTruthy();
    expect(errorEl.nativeElement.textContent.trim()).toContain('Gracz');

  }));

  it('should display 5 filtered players after typing input', fakeAsync(() => {
    const players = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `Player${i + 1}`
    }));

    mockService.searchPlayers.and.returnValue(of(players));

    component.control.setValue('P');
    tick(300);
    fixture.detectChanges();

    expect(mockService.searchPlayers).toHaveBeenCalledWith('P');
    expect(component.filteredPlayers.length).toBe(5);
    expect(component.filteredPlayers.map(p => p.name)).toEqual([
      'Player1', 'Player2', 'Player3', 'Player4', 'Player5'
    ]);
  }));

  it('should update filtered players list after second input', fakeAsync(() => {
    const firstBatch = [
      { id: 1, name: 'Player1' },
      { id: 2, name: 'Player2' },
      { id: 3, name: 'Player3' },
      { id: 4, name: 'Player4' },
      { id: 5, name: 'Player5' },
    ];
    const secondBatch = [{ id: 7, name: 'Player7' }];

    mockService.searchPlayers.and.callFake((input: string) => {
      if (input === 'P') {
        return of(firstBatch).pipe(delay(100));
      } else if (input === 'Player7') {
        return of(secondBatch).pipe(delay(100));
      } else {
        return of([]).pipe(delay(100));
      }
    });

    component.control.setValue('P');
    tick(300);
    tick(100);
    fixture.detectChanges();
    expect(component.filteredPlayers).toEqual(firstBatch);

    component.control.setValue('Player7');
    tick(300);
    tick(100);
    fixture.detectChanges();
    expect(component.filteredPlayers).toEqual([{ id: 7, name: 'Player7' }]);
  }));

});