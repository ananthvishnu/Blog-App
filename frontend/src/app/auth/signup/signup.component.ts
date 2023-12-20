import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import Validation from 'src/app/Validations/password.validation';
import { HttpServiceService } from 'src/app/database/http.service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup | any;
  submitted: boolean = false;
  isLoading: boolean = false;
  visible: boolean = true;
  changetype: boolean = true;

  visible1: boolean = true;
  changetype1: boolean = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: HttpServiceService,
    private toaster: NgToastService
  ) {}

  ngOnInit(): void {
    this.initialForm();
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  viewpass1() {
    this.visible1 = !this.visible1;
    this.changetype1 = !this.changetype1;
  }

  initialForm() {
    this.signupForm = this.fb.group(
      {
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  signup() {
    this.isLoading = true;
    if (this.signupForm.valid) {
      const data = {
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      };

      this.apiService.post('/api/auth/signup', data).subscribe(
        (response: any) => {
          this.toaster.success({
            detail: 'SUCCESS',
            summary: 'Signup successfully',
            duration: 5000,
            position: 'topRight',
          });
          this.isLoading = false;
          this.submitted = false;
          //localStorage.setItem('token', response.user.token);
          //this.authService.CurrentUserSig.set(response.user);
          this.router.navigateByUrl('');
        },
        (error: any) => {
          this.isLoading = false;
          this.submitted = false;
          this.toaster.error({
            detail: 'ERROR',
            summary: 'Failed to signup. Please try again.',
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
