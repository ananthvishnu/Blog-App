import { Component, Inject, OnInit } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
})
export class CreateBlogComponent implements OnInit {
  CreateBlogForm: FormGroup | any;
  submitted: boolean = false;
  isLoading: boolean = false;
  visible: boolean = true;
  changetype: boolean = true;
  blog: any;
  message: any;
  public ifData: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateBlogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: HttpServiceService,
    private toaster: NgToastService
  ) {
    this.blog = data?.blog;
    this.message = data.message;
    console.log(this.blog);
  }

  ngOnInit(): void {
    this.initialForm();
    if (this.blog) {
      this.ifData = false;
      this.CreateBlogForm.patchValue({
        title: this.blog.title || '',
        content: this.blog.content || '',
      });
    } else {
      this.ifData = true;
    }
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  initialForm() {
    this.CreateBlogForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.CreateBlogForm.controls;
  }

  CreateBlog() {
    this.isLoading = true;
    if (this.CreateBlogForm.valid) {
      const data = {
        title: this.CreateBlogForm.value.title,
        content: this.CreateBlogForm.value.content,
        author:localStorage.getItem('username')
      };

      this.apiService.post('/api/blog/create', data).subscribe(
        (response: any) => {
          this.toaster.success({
            detail: 'SUCCESS',
            summary: 'Blog created successfully',
            duration: 5000,
            position: 'topRight',
          });
          this.isLoading = false;
          this.submitted = false;
          this.dialogRef.close({saved:true});
        },
        (error: any) => {
          this.isLoading = false;
          this.submitted = false;
          this.toaster.error({
            detail: 'ERROR',
            summary: 'Failed to create blog. Please try again.',
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

  UpdateBlog(){
    this.isLoading = true;
    if (this.CreateBlogForm.valid) {
      const data = {
        title: this.CreateBlogForm.value.title,
        content: this.CreateBlogForm.value.content,
        author:localStorage.getItem('username')
      };

      this.apiService.putData(`/api/blog/edit/${this.blog.id}`, data).subscribe(
        (response: any) => {
          this.toaster.success({
            detail: 'SUCCESS',
            summary: 'Blog updated successfully',
            duration: 5000,
            position: 'topRight',
          });
          this.isLoading = false;
          this.submitted = false;
          this.dialogRef.close({updated:true});
        },
        (error: any) => {
          this.isLoading = false;
          this.submitted = false;
          this.toaster.error({
            detail: 'ERROR',
            summary: 'Failed to update blog. Please try again.',
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

  closeModel() {
    this.dialogRef.close();
  }
}
