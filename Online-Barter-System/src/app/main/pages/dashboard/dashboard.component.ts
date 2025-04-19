import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogoutDialogComponent } from '../../shared/confirm-logout-dialog/confirm-logout-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  user: any;
  profile: any;

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => {
      this.user = user;
      if (user && user.id) {
        this.userService.getProfileByUserId(user.id).subscribe({
          next: (data) => {
            console.log('Profile data:', data);
            this.profile = data.profile; // Ensure you access the profile from the response object
          },
          error: (err) => {
            console.error('Failed to fetch profile', err);
          }
        });
      }
    });
  }
  



  // showAddItem: boolean = false;
  // AddItem(){
  //   this.showAddItem = true;
  // }
  // onCancel(): void {
  //   this.showAddItem = false;
  // }

  loading: boolean = false;
  onLogout(): void {
    
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.userService.logout();
        this.router.navigate(['/main/landing']);
      }
    });
  }

  // listings = [
  //   { image: 'assets/images/shoes.jpg', title: 'Running Shoes', status: 'Available' },
  //   { image: 'assets/images/headphones.jpg', title: 'Bluetooth Headphones', status: 'Pending' },
  //   { image: 'assets/images/book.jpg', title: 'Science Fiction Book', status: 'Available' },
  //   { image: 'assets/images/jacket.jpg', title: 'Winter Jacket', status: 'New' },
  //   { image: 'assets/images/mug.jpg', title: 'Ceramic Mug', status: 'Available' },
  //   { image: 'assets/images/lamp.jpg', title: 'Desk Lamp', status: 'Traded' },
  // ];

  // offers = [
  //   { user: 'Alice', item: 'Yoga Mat', status: 'Pending' },
  //   { user: 'Bob', item: 'Kitchen Blender', status: 'Accepted' },
  //   { user: 'Charlie', item: 'Vintage Clock', status: 'Declined' },
  // ];
}
