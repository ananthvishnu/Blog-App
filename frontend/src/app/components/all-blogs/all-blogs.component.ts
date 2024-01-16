import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpServiceService } from 'src/app/database/http.service.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {
  blogPosts: any[] = [];
  singleData: any;
  id:any
  constructor(private apiService:HttpServiceService, private router:Router) { }

  ngOnInit(): void {
    this.getAllBlogs();
    this.getBlogById(1);
    console.log(this.getBlogById(1))
  }

  items = [
    { 
      imageUrl: '../../../assets/img/post-bg.jpg',
      heading: 'Heading 1',
      description: ' Lorem ipsum for itemLorem ipsum for ... 1'
    },
    { 
      imageUrl: '../../../assets/img/post-bg.jpg',
      heading: 'Heading 2',
      description: ' Lorem ipsum for itemLorem ipsum for ... 2'
    },
     { 
      imageUrl: '../../../assets/img/post-bg.jpg',
      heading: 'Heading 1',
      description: ' Lorem ipsum for itemLorem ipsum for ... 1'
    },
    { 
      imageUrl: '../../../assets/img/post-bg.jpg',
      heading: 'Heading 2',
      description: ' Lorem ipsum for itemLorem ipsum for ... 2'
    },
    { 
      imageUrl: '../../../assets/img/post-bg.jpg',
      heading: 'Heading 1',
      description: ' Lorem ipsum for itemLorem ipsum for ... 1'
    },
    { 
      imageUrl: '../../../assets/img/post-bg.jpg',
      heading: 'Heading 2',
      description: ' Lorem ipsum for itemLorem ipsum for ... 2'
    },
     { 
      imageUrl: '../../../assets/img/post-bg.jpg',
      heading: 'Heading 1',
      description: ' Lorem ipsum for itemLorem ipsum for ... 1'
    },
    { 
      imageUrl: '../../../assets/img/post-bg.jpg',
      heading: 'Heading 2',
      description: ' Lorem ipsum for itemLorem ipsum for ... 2'
    },
    // Add more items as needed
  ];

getAllBlogs() {
  this.apiService.getData('/api/blog/blogs').subscribe((data: any) => {
    this.blogPosts = data.blogs;
    console.log(this.blogPosts);
  });
}

getBlogById(id: any) {
  this.apiService.getData(`/api/blog/blogs/${id}`).subscribe((data: any) => {
    this.singleData = data.blogs;
    console.log(this.singleData);
  });
}



//  // GET MEMBER BY ID
//  getBlogById(id: any): void {
//   this.router.navigate([`/api/blog/blogs/${id}`]);

//   this.apiService.getData(id).subscribe(
//     (memberDetails) => {
//     },
//     (error) => {
//       console.error('Error fetching user details:', error);
//     }
//   );
// }


}
