import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/database/http.service.service';
import { UserInterface } from 'src/app/interface/user.interface';
import { AuthServiceService } from 'src/app/shared/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userData: any;
  userId: any;

  constructor(
    public authService: AuthServiceService,
    private http: HttpClient,
    private router: Router,
    public apiService: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.getOneUser();
    console.log(this.authService.CurrentUserSig());
    
  }

  getOneUser() {
    this.apiService.getData(`/api/auth/user/${this.userId}`).subscribe({
      next: (response) => {
        this.userData = response;
        this.authService.CurrentUserSig.set(response);
      },
      error: () => {
        this.authService.CurrentUserSig.set(null);
      },
    });
  }

  logout() {
    localStorage.setItem('token', '');
    localStorage.setItem('id', '');
    this.authService.CurrentUserSig.set(null);
    this.router.navigateByUrl('/login');
  }
}
