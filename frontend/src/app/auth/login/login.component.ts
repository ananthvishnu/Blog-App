import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/database/http.service.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthServiceService } from 'src/app/shared/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  submitted: boolean = false;
  isLoading: boolean = false;
  visible: boolean = true;
  changetype: boolean = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: HttpServiceService,
    private toaster: NgToastService,
    private authService: AuthServiceService,

  ) {}

  ngOnInit(): void {
    this.initialForm();
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  initialForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      const data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.apiService.post('/api/auth/login', data).subscribe(
        (response: any) => {
          console.log(response.user);
          
          this.toaster.success({
            detail: 'SUCCESS',
            summary: 'Login successfully',
            duration: 5000,
            position: 'topRight',
          });
          this.isLoading = false;
          this.submitted = false;
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.user.id);
          this.authService.CurrentUserSig.set(response.user);
          this.router.navigateByUrl('');
        },
        (error: any) => {
          this.isLoading = false;
          this.submitted = false;
          this.toaster.error({
            detail: 'ERROR',
            summary: 'Failed to login. Please try again.',
            sticky: true,
            position: 'topRight',
          });
        }
      );
    } else {
      this.submitted = true;
      this.isLoading = false;
    }
  }
}
