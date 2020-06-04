import { Component, OnInit, Inject } from '@angular/core';
import { NotesService } from 'src/app/services/notes/notes.service';
import { INoteResponse } from 'src/app/model/INoteResponse';
import {FormBuilder, FormGroup, FormControl, AbstractControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ErrorStateMatcher} from '@angular/material/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ICreateNote } from 'src/app/model/ICreateNote';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface EditDialogData {
  note: INoteResponse;
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

  openEditDialog(note: INoteResponse) {
    const dialogRef = this.dialog.open(EditNoteDialog, {
      maxHeight: '100vh',
      data: {noteData: note},
      disableClose: true
    });
    
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if(!result && result !== undefined){
        this.getMyNotes(0);
      }
        
    });
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteNoteDialog);
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteNote(id);
      }
        
    });
  }

  // editNote(note: INoteResponse) {

  // }

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

  // getEditDialogMinWidth(): string {
  //   let minwidth = '';
  //   this.isHandset$.subscribe(res => {
  //      minwidth = '300px';
  //    }, err => {
  //      minwidth = '500px';
  //    });

  //    return minwidth;
  //  }
 


}

@Component({
  selector: 'edit-note-dialog',
  templateUrl: 'edit-note-dialog.html',
  styleUrls: ['./edit-note-dialog.css']
})
export class EditNoteDialog implements OnInit{

 

  formGroup: FormGroup;
  status = [
    'NOTSTARTED',
    'ONGOING',
    'COMPLETED'
  ];

  priority: string;
  priorities: string[] = ['HIGH', 'MEDIUM', 'LOW'];

  note: ICreateNote = {
    title: '',
    description: '',
    status: '',
    dueDate: '',
    priority: ''
  }

  events: string[] = [];

  loading: boolean = false;

  matcher = new MyErrorStateMatcher();

  editDialogMinWidth: string = '';


  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  response: string = '';

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  get titleValue() {
    return this.formGroup.get('title');
  }

  get statusValue() {
    return this.formGroup.get('status');
  }

  get dateValue() {
    return this.formGroup.get('date');
  }

  get descriptionValue() {
    return this.formGroup.get('description');
  }

  get priorityValue() {
    return this.formGroup.get('priority');
  }

  constructor(
    public dialogRef: MatDialogRef<EditNoteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
    private formBuilder: FormBuilder,
    private notesService: NotesService,
    private router: Router,
    private _snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    console.log(this.data['noteData']);
    let duedate = new Date(this.data['noteData']['dueDate']);
    // console.log(date);
    this.formGroup = this.formBuilder.group({
        title: [this.data['noteData']['title'],  [Validators.required, Validators.minLength(10), Validators.maxLength(80)]],
        status: [this.data['noteData']['status'], [Validators.required]],
        date: [duedate, [Validators.required]],
        description: [this.data['noteData']['description'], [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
        priority: [this.data['noteData']['priority'], [Validators.required]]
    });
  
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.log(this.formGroup.value);
    // console.log(this.formGroup.value.date.toLocaleString().split(',')[0]);
   
    // console.log(this.authService.isLoggedIn());


    this.note.title = this.formGroup.value.title;
    this.note.description = this.formGroup.value.description;
    this.note.priority = this.formGroup.value.priority;
    this.note.dueDate = this.formGroup.value.date.toLocaleString().split(',')[0];
    this.note.status = this.formGroup.value.status;

    // console.log(this.note);
    this.loading = true;
    
    this.notesService.updateNote(this.data['noteData']['id'], this.note).subscribe(res => {
        this.loading = false;
        this.response = res['message'];
    }, err => {
        this.loading = false;
        this.response = 'An error occurred!';
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
  templateUrl: 'delete-note-dialog.html'
})
export class DeleteNoteDialog {}



