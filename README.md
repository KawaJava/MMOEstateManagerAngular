# MMOEstateManager - Frontend

📌 **English version is available below the Polish version. Scroll down to read it. You can also use the table of contents below to quickly jump to it.**

### Spis treści (Polska wersja)

1. [Opis projektu](#opis-projektu)
2. [Wymagania](#wymagania)
3. [Instalacja](#instalacja)
4. [Uruchamianie aplikacji](#uruchamianie-aplikacji)
   - [Uruchomienie aplikacji w trybie deweloperskim](#uruchomienie-aplikacji-w-trybie-deweloperskim)
   - [Budowanie aplikacji](#budowanie-aplikacji)
5. [Podsumowanie](#podsumowanie)
6. [Link do backendu](#link-do-backendu)

### Table of Contents

1. [Project Description](#project-description)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
   - [Running in Development Mode](#running-in-development-mode)
   - [Building the Application](#building-the-application)
5. [Summary](#summary)
6. [Link to Backend](#link-to-backend)


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
Możesz teraz uruchomić aplikację frontendową zgodnie z tymi instrukcjami.
## Podsumowanie
MMOEstateManager to nowoczesny system umożliwiający zarządzanie włościami graczy w grach MMO. Dzięki pełnej integracji z backendem, zaawansowanemu frontendowi w Angularze oraz rozbudowanej logice biznesowej, zapewnia kompleksową funkcjonalność, która odpowiada na potrzeby graczy, administratorów oraz deweloperów. Integracja z RxJS, Angular Material, Chart.js i innymi nowoczesnymi bibliotekami pozwala stworzyć intuicyjny i funkcjonalny interfejs użytkownika, podczas gdy backend oferuje solidne podstawy do przechowywania i zarządzania danymi.
## Link do backendu

Jeśli chcesz zapoznać się z projektem backendowym, odwiedź [MMOEstateManager](https://github.com/KawaJava/MMOEstateManager).

## Project Description

MMOEstateManager - Frontend is a part of the system responsible for managing MMO players' estates, designed in Angular with a focus on modularity, responsiveness, and good architectural practices (SOLID, DRY, KISS). The code is divided into functional modules, and the UI is based on Angular Material and dynamic data managed by RxJS.

The application provides an intuitive interface for browsing and managing estates in MMO games, including the state of gold and data about sheriffs and mayors. It allows tracking historical changes, monitoring gold amounts, and identifying anomalies, such as exceeding set limits.

## Technologies and Libraries

- **Angular 13.3**: application structure, components, routing, and lazy loading, enabling dynamic data loading as needed.
- **TypeScript**: safe data typing to ensure better code quality.
- **RxJS**: handling asynchrony and data streams using operators like `BehaviorSubject`, `tap`, and `catchError`.
- **Angular Material**: advanced UI components (e.g., `MatTable`, `MatDialog`, `MatPaginator`, `MatSnackBar`).
- **Angular Flex-Layout**: responsive layouts that adjust to different screen sizes.
- **SCSS**: flexible styling for full control over the application's appearance.
- **Reactive Forms**: advanced form management with validation and dynamic reactions.
- **Angular Router**: application routing and securing paths using **AuthGuard**.
- **Interceptors**: automatically adding JWT tokens to HTTP requests and handling authorization-related errors.
- **Chart.js + ng2-charts**: creating interactive charts (BarChart, PieChart) for data visualization.

## Requirements
To run the project locally, you need to have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (for installing dependencies)
- **Angular CLI** (version 13.3)
- **Git** (for cloning the repository)
- **Web browser** (e.g., Google Chrome, Firefox)
- **Code editor** (e.g., IntelliJ IDEA, Visual Studio Code, or any other IDE with Angular support)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KawaJava/MMOEstateManagerAngular.git
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Application

To run the application locally, follow the steps below:

### Running in Development Mode
1. Start the development server:
   ```bash
   ng serve
   ```
2. The application will be available at: http://localhost:4200
## Building the Application

To build the application for production:
     ```bash
     ng build --prod
     ```
## Summary

MMOEstateManager is a modern system for managing MMO player estates. With full backend integration, an advanced frontend built in Angular, and robust business logic, it offers comprehensive functionality that meets the needs of players, administrators, and developers. Integration with RxJS, Angular Material, Chart.js, and other modern libraries creates an intuitive and functional user interface, while the backend provides a solid foundation for storing and managing data.

## Link to Backend

If you'd like to explore the backend project, visit [MMOEstateManager](https://github.com/KawaJava/MMOEstateManager).
