import { Component, OnInit, Inject } from '@angular/core';
import { NotesService } from 'src/app/services/notes/notes.service';
import { INoteResponse } from 'src/app/model/INoteResponse';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  content: string = 'content';
  last: string = 'last';
  totalPages: string = 'totalPages';

  lastpage: boolean;
  totalpages: number;
  notes: INoteResponse[];
  loading: boolean = true;
  error: boolean = false;
  
  animal: string;
  name: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private notesService: NotesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMyNotes(0);
  }

  getMyNotes(page: number) {
    this.notesService.getMyNotes(page).subscribe(res => {
      console.log(res);
      this.notes = res[this.content];
      this.lastpage = res[this.last];
      this.totalpages = res[this.totalPages];
      
      this.loading = false;
      this.error = false;

      // console.log(this.notes);
    }, err => {
      this.error = true;
      console.log(err);
    })
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteNoteDialog);
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteNote(id);
      }
        
    });
  }

  deleteNote(id: number) {
    this.notesService.deleteNote(id).subscribe(res => {
      
      // show snackbar and load the notes
      this.openSnackBar('Scribble deleted!');
      this.getMyNotes(0);
    }, err => {
      this.openSnackBar('Error deleting scribble!');
    })
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Close', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


}

@Component({
  selector: 'delete-note-dialog',
  templateUrl: 'delete-note-dialog.html',
})
export class DeleteNoteDialog {}

