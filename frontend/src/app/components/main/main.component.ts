import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { HttpServiceService } from 'src/app/database/http.service.service';
import { CreateBlogComponent } from 'src/app/models/create-blog/create-blog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  blogPosts: any[] = [];

  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.apiService.getData('/api/blog/blogs').subscribe((data: any) => {
      this.blogPosts = data.blogs;
      console.log(this.blogPosts);
    });
  }

  constructor(
    public apiService: HttpServiceService,
    private matDialog: MatDialog,
    private toaster: NgToastService

  ) {}

  createBlog(): void {
    const dialogRef: MatDialogRef<CreateBlogComponent> = this.matDialog.open(
      CreateBlogComponent,
      {
        width: '700px',
        // height: '630px',
        // maxWidth: '100%',
        disableClose: true,
        data: { message: 'Create' },
        // height:'800px',
      }
    );
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && (result.saved || result.updated)) {
        this.getAllBlogs()
      }
    });
  }

  editBlog(blog: any): void {
    const dialogRef: MatDialogRef<CreateBlogComponent> = this.matDialog.open(
      CreateBlogComponent,
      {
        width: '700px',
        // height: '630px',
        // maxWidth: '100%',
        disableClose: true,
        data: { blog: blog, message: 'Create' },
        // height:'800px',
      }
    );
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && (result.saved || result.updated)) {
        this.getAllBlogs()
      }
    });
  }

  deleteBlog(blogId:any){
    this.apiService.deleteData(`/api/blog/delete/${blogId}`).subscribe(
      (response: any) => {
        this.toaster.success({
          detail: 'SUCCESS',
          summary: 'Blog deleted successfully',
          duration: 5000,
          position: 'topRight',
        });
      
      },
      (error: any) => {
  
        this.toaster.error({
          detail: 'ERROR',
          summary: 'Failed to delete blog. Please try again.',
          sticky: true,
          position: 'topRight',
        });
      }
    );
  }
}
