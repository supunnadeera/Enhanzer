import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { BookFormComponent } from '../book-form/book-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  displayedColumns: string[] = ['title', 'author', 'isbn', 'publicationDate', 'actions'];

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (books: Book[]) => {
        this.books = books;
        this.snackBar.open('Books loaded successfully', 'Close', { duration: 3000 });
      },
      error: (error: Error) => {
        console.error('Error loading books:', error);
        this.snackBar.open('Error loading books. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  openBookForm(book?: Book): void {
    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '400px',
      data: book || {} as Book,
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe((result: Book | undefined) => {
      if (result) {
        if (book?.id) {
          this.updateBook(book.id, result);
        } else {
          this.createBook(result);
        }
      }
    });
  }

  deleteBook(book: Book): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete "${book.title}"?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && book.id) {
        this.bookService.deleteBook(book.id).subscribe({
          next: () => {
            this.loadBooks();
            this.snackBar.open('Book deleted successfully', 'Close', { 
              duration: 3000,
              panelClass: ['success-snackbar']
            });
          },
          error: (error: Error) => {
            console.error('Error deleting book:', error);
            this.snackBar.open('Error deleting book. Please try again.', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  private createBook(book: Book): void {
    this.bookService.createBook(book).subscribe({
      next: (createdBook: Book) => {
        this.loadBooks();
        this.snackBar.open('Book created successfully', 'Close', { 
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (error: Error) => {
        console.error('Error creating book:', error);
        this.snackBar.open('Error creating book. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  private updateBook(id: string, book: Book): void {
    this.bookService.updateBook(id, book).subscribe({
      next: () => {
        this.loadBooks();
        this.snackBar.open('Book updated successfully', 'Close', { 
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (error: Error) => {
        console.error('Error updating book:', error);
        this.snackBar.open('Error updating book. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}