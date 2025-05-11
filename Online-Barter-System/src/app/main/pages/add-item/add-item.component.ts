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

  selectedFile: File | null = null;
  currentUser: any;
  
    constructor(private userService: UserService, private itemsService: ItemsService, private router: Router) {}
  
    ngOnInit(): void {
      this.userService.currentUser$.subscribe(user => {
        this.currentUser = user;
      });
    }

  AddItemForm: FormGroup = new FormGroup ({
    itemName: new FormControl ('', [Validators.required]),
    itemDescription: new FormControl ('', [Validators.required]),
    itemCategory: new FormControl ('', [Validators.required])
  })

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }
  

  @Output() cancel = new EventEmitter<void>();

  onCancel(): void {
    this.cancel.emit();
  }  

  status = 'available';
  addItem(): void {
    if (this.AddItemForm.invalid || !this.currentUser) {
      return;
    }
    if (!this.selectedFile) return;

    const fileSizeInMB = this.selectedFile.size / (1024 * 1024); // Convert size from bytes to MB
    console.log('File size in MB:', fileSizeInMB);

    const itemData = new FormData();

    itemData.append('name', this.AddItemForm.value.itemName);
    itemData.append('description', this.AddItemForm.value.itemDescription);
    itemData.append('owner', this.currentUser.username);
    itemData.append('category', this.AddItemForm.value.itemCategory);
    itemData.append('status', this.status);
    itemData.append('image', this.selectedFile);
  
    this.itemsService.addItem(itemData).subscribe({
      next: (res) => {
        console.log('Item added:', res);
      },
      error: (err) => {
        console.error('Failed to add item:', err);
      }
    });
    this.cancel.emit();
}
}
