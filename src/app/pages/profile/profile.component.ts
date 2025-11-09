import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  employeeInfo: any;
  
  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.loadMyInfo();
    this.loadEmployeeInfo();
  }

  loadMyInfo(): void {
    this.userService.getMyInfo().subscribe({
      next: (data) => {
        if (data.success) {
          this.userInfo = data.data;
        }
      },
      error: (err) => {
        console.error('Error: ', err);
      }
    });
  }


  loadEmployeeInfo(): void {
    this.userService.getEmploymentInfo().subscribe({
      next: (data) => {
        if (data.success) {
          this.employeeInfo = data.data;
        }
      },
      error: (err) => {
        console.error('Error: ', err);
      }
    });
  }
}
