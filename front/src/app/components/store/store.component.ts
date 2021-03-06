import { ProfileService } from './../../services/profile.service';
import { StoreService } from './../../services/store.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  query: string = '';
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  file: any;
  video: any;
  store: any;
  constructor(
    private sanitizer: DomSanitizer,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.getCoursesByInstructor(this.user._id).subscribe((res) => {
      this.store = res;
    });
  }

  Logout() {
    localStorage.clear();
  }

  deleteCourse(id: any) {
    this.storeService.deleteService(id).subscribe(() => {
      for (var i = 0; i < this.store.length; i++) {
        if (this.store[i]._id === id) {
          this.store.splice(i, 1);
        }
      }
    });
  }

  getfile(f: any) {
    this.file = '';
    // this.file = this.sanitizer.bypassSecurityTrustResourceUrl(
    //   'assets/uploads/courses/' + f    );
    const imgpdf=f.slice(0,-3)+'jpg'

    this.file =imgpdf
    console.log(this.file);

  }

  
  getCourse(id: any) {
    this.router.navigate(['/coursedetails', id]).then(() => {
      location.reload();
    });
  }

  getresult(query: any) {
    this.router.navigate(['/result', query]).then(() => {
      location.reload();
    });
  }
}
