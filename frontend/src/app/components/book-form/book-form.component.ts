// src/app/components/book-form/book-form.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {
    // Similar to React's useState, but for forms
    this.bookForm = this.fb.group({
      title: [data?.title || '', [Validators.required, Validators.maxLength(100)]],
      author: [data?.author || '', [Validators.required, Validators.maxLength(50)]],
      isbn: [data?.isbn || ''],
      publicationDate: [data?.publicationDate || null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      // Similar to React's form submission handler
      this.dialogRef.close(this.bookForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}