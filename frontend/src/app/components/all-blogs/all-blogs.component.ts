import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/database/http.service.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {
  blogPosts: any[] = [];

  constructor(private apiService:HttpServiceService) { }

  ngOnInit(): void {
    this.getAllBlogs();
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

}
