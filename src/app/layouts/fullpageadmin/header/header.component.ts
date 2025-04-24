import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/modules/common/service/jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = true;
  
  constructor(private authService: JwtService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem("token");
        this.router.navigate(['/admin-login']);
      },
      error: (err) => {
        localStorage.removeItem("token");
        this.router.navigate(['/admin-login']);
      }
    });
  }
  

}
