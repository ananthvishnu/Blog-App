import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/database/http.service.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent {
  blogPosts: any[] = [];
  singleData: any;
 id:any
  constructor(private apiService:HttpServiceService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.getBlogById()
    });
  }

  // getUserDetails(): void {
  //   // this.ngxService.start();
  //   this.getBlogById(this.id).subscribe(
  //     (userDetails) => {
  //       this.userDetails = userDetails;
  //       this.ngxService.stop();
  //       this.memberDetailForm.patchValue({
  //         ppaId: userDetails.ppaId,
  //         fullName: userDetails.fullName,
  //         nameUsedInSchool: userDetails.nameUsedInSchool,
  //         nameInPPARegister: userDetails.nameInPPARegister,
  //         permantAddress: userDetails.permantAddress,
  //         mobilePhoneNumber: userDetails.mobilePhoneNumber,
  //         email: userDetails.email,
  //         residenceTelephoneNumber: userDetails.residenceTelephoneNumber,
  //         occupationAndDesignation: userDetails.occupationAndDesignation,
  //         postalOfficeAdderss: userDetails.postalOfficeAdderss,
  //         officeTelephoneNumber: userDetails.officeTelephoneNumber,
  //         nationalIdCardNumber: userDetails.nationalIdCardNumber,
  //         yearOfAddminsionToSchool: userDetails.yearOfAddminsionToSchool,
  //         advanceLevelYear: userDetails.advanceLevelYear,
  //         admissionNumber: userDetails.admissionNumber,
  //         lastExaminationPassedInSchool:
  //         userDetails.lastExaminationPassedInSchool,
  //         courceOfStudiesFollow: userDetails.courceOfStudiesFollow,
  //         pursuedHigherStudies: userDetails.pursuedHigherStudies,

  //         nameOfTheHusband: userDetails.nameOfTheHusband,
  //         husbandOccupation: userDetails.husbandOccupation,
  //         husbandOfficeTelephoneNumeber:
  //           userDetails.husbandOfficeTelephoneNumeber,
  //         husbandOfficeAddress: userDetails.husbandOfficeAddress,

  //         sisterDetails: userDetails.sisterDetails,
  //         daughterDetails: userDetails.daughterDetails,
  //         otherInformation: userDetails.otherInformation,
  //         typeOfMembership: userDetails.typeOfMembership,

  //         firstNonReletedPPAMemberName:
  //           userDetails.firstNonReletedPPAMemberName,
  //         firstNonReletedPPAMemberAlbatch:
  //           userDetails.firstNonReletedPPAMemberAlbatch,
  //         firstNonReletedPPAMemberPPAId:
  //           userDetails.firstNonReletedPPAMemberPPAId,
  //         secondNonReletedPPAMemberName:
  //           userDetails.secondNonReletedPPAMemberName,
  //         secondNonReletedPPAMemberAlbatch:
  //           userDetails.secondNonReletedPPAMemberAlbatch,
  //         secondNonReletedPPAMemberPPAId:
  //           userDetails.secondNonReletedPPAMemberPPAId,
  //         isAllowedMember1: userDetails.isAllowedMember1,
  //         isAllowedMember2: userDetails.isAllowedMember2,
  //         isAllowedMember3: userDetails.isAllowedMember3,

  //         isActive: userDetails.isActive,
  //         selectedRole: userDetails.roleId,
  //       });
  //     },
  //     (error) => {
  //       console.error('Error fetching user details:', error);
  //     }
  //   );
  // }

  
getBlogById() {
  this.apiService.getData(`/api/blog/blogs/`).subscribe((data:any) => {
    this.singleData = data.blog?.blogs
    console.log(this.singleData)
  })
}
}
