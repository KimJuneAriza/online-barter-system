import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ItemsService } from '../../services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  standalone: false,
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent implements OnInit{

  currentUser: any;
  
    constructor(private userService: UserService, private itemsService: ItemsService, private router: Router) {}
  
    ngOnInit(): void {
      this.userService.currentUser$.subscribe(user => {
        this.currentUser = user;
      });
    }

  AddItemForm: FormGroup = new FormGroup ({
    itemName: new FormControl ('', [Validators.required]),
    itemDescription: new FormControl ('', [Validators.required])
  })

  @Output() cancel = new EventEmitter<void>();

  onCancel(): void {
    this.cancel.emit();
  }  

  addItem(): void {
    if (this.AddItemForm.invalid || !this.currentUser) {
      return;
    }
  
    const itemData = {
      name: this.AddItemForm.value.itemName,
      description: this.AddItemForm.value.itemDescription,
      owner: this.currentUser.username
    };
  
    this.itemsService.addItem(itemData).subscribe({
      next: (res) => {
        console.log('Item added:', res);
        // optionally reset form or notify user
        // const currentUrl = this.router.url;
        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        // this.router.navigate([currentUrl]);
  // });
      },
      error: (err) => {
        console.error('Failed to add item:', err);
      }
    });

    this.cancel.emit();

}
}
