# MMOEstateManager - Frontend

# Spis treści

1. [Opis projektu](#opis-projektu)
2. [Wymagania](#wymagania)
3. [Instalacja](#instalacja)
4. [Uruchamianie aplikacji](#uruchamianie-aplikacji)
   - [Uruchomienie aplikacji w trybie deweloperskim](#uruchomienie-aplikacji-w-trybie-deweloperskim)
   - [Budowanie aplikacji](#budowanie-aplikacji)
5. [Podsumowanie](#podsumowanie)
6. [Link do backendu](#link-do-backendu)

## Opis projektu
MMOEstateManager - Frontend to część systemu odpowiedzialna za zarządzanie włościami graczy MMO, zaprojektowana w Angularze z naciskiem na modularność, responsywność i dobre praktyki architektoniczne (SOLID, DRY, KISS). Kod jest podzielony na funkcjonalne moduły, a UI opiera się na Angular Material i dynamicznych danych sterowanych przez RxJS.

Aplikacja oferuje intuicyjny interfejs do przeglądania i zarządzania włościami w grach MMO, w tym stanem złota oraz danymi o szeryfach i wójtach. Umożliwia śledzenie historycznych zmian, monitorowanie ilości złota i identyfikowanie anomalii, jak przekroczenie ustalonych limitów.

## Technologie i biblioteki

- **Angular 13.3**: struktura aplikacji, komponenty, routing i lazy loading, umożliwiające dynamiczne ładowanie danych w zależności od potrzeb.
- **TypeScript**: bezpieczne typowanie danych zapewniające lepszą jakość kodu.
- **RxJS**: zarządzanie asynchronicznością i strumieniami danych, wykorzystujące operatory takie jak `BehaviorSubject`, `tap`, czy `catchError`.
- **Angular Material**: zaawansowane komponenty UI (np. `MatTable`, `MatDialog`, `MatPaginator`, `MatSnackBar`).
- **Angular Flex-Layout**: responsywne layouty dostosowujące się do różnych rozmiarów ekranów.
- **SCSS**: elastyczne stylowanie umożliwiające pełną kontrolę nad wyglądem aplikacji.
- **Reactive Forms**: zaawansowane zarządzanie formularzami z walidacją i dynamicznymi reakcjami.
- **Angular Router**: routing aplikacji i zabezpieczanie ścieżek za pomocą **AuthGuard**.
- **Interceptors**: automatyczne dołączanie tokenów JWT do żądań HTTP oraz obsługa błędów związanych z autoryzacją.
- **Chart.js + ng2-charts**: tworzenie interaktywnych wykresów (BarChart, PieChart) do wizualizacji danych.

## Wymagania

Aby uruchomić projekt lokalnie, musisz mieć zainstalowane:

- **Node.js** (w wersji 16.0 lub nowszej)
- **npm** (do instalacji zależności)
- **Angular CLI** (w wersji 13.3)
- **Git** (do klonowania repozytorium)
- **Przeglądarka internetowa** (np. Google Chrome, Firefox)
- **Edytor kodu** (np. IntelliJ IDEA, Visual Studio Code lub inne IDE z obsługą Angulara)

## Instalacja

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/KawaJava/MMOEstateManagerAngular.git
   ```
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
## Uruchamianie aplikacji

Aby uruchomić aplikację lokalnie, wykonaj poniższe kroki:

### Uruchomienie aplikacji w trybie deweloperskim
1. Uruchom serwer deweloperski:
   ```bash
   ng serve
   ```
2. Aplikacja będzie dostępna pod adresem: http://localhost:4200.
## Budowanie aplikacji

Aby zbudować aplikację na produkcję:
    ```bash
   ng build --prod
    ```
Możesz teraz uruchomić aplikację frontendową zgodnie z tymi instrukcjami. Jeśli chcesz coś zmienić, daj znać!
## Podsumowanie
MMOEstateManager to nowoczesny system umożliwiający zarządzanie włościami graczy w grach MMO. Dzięki pełnej integracji z backendem, zaawansowanemu frontendowi w Angularze oraz rozbudowanej logice biznesowej, zapewnia kompleksową funkcjonalność, która odpowiada na potrzeby graczy, administratorów oraz deweloperów. Integracja z RxJS, Angular Material, Chart.js i innymi nowoczesnymi bibliotekami pozwala stworzyć intuicyjny i funkcjonalny interfejs użytkownika, podczas gdy backend oferuje solidne podstawy do przechowywania i zarządzania danymi.
## Link do backendu

Jeśli chcesz zapoznać się z projektem backendowym, odwiedź [MMOEstateManager](https://github.com/KawaJava/MMOEstateManager).
