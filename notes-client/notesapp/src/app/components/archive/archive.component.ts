import { Component, OnInit, Inject } from '@angular/core';
import { INoteResponse } from 'src/app/model/INoteResponse';
import { Observable } from 'rxjs';
import { NotesService } from 'src/app/services/notes/notes.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { ICreateNote } from 'src/app/model/ICreateNote';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme/theme.service';





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
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})

export class ArchiveComponent implements OnInit {
  
  constructor(
    private notesService: NotesService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentpage = 1;
    this.getCompletedNotes(0);
  }


  content: string = 'content';
  last: string = 'last';
  totalPages: string = 'totalPages';
  totalElements: string = 'totalElements';

  
  lastpage: boolean;
  totalpages: number;
  currentpage: number = 1;
  totalnotes: number;
  notes: INoteResponse[];
  loading: boolean = true;
  error: boolean = false;
  
  notesArraySize: number;

  animal: string;
  name: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  getCompletedNotes(page: number) {
    this.notesService.getCompletedNotes(page).subscribe(res => {
      console.log(res);
      this.notes = res[this.content];
      this.lastpage = res[this.last];
      this.totalpages = res[this.totalPages];
      this.totalnotes = res[this.totalElements];
      
      this.notesArraySize = this.notes.length;
      this.loading = false;
      this.error = false;

      // console.log(this.notes);
    }, err => {
      this.error = true;
      console.log(err);
    })
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteCompletedNoteDialog);
    
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteNote(id);
        
      }
        
    });
  }

  editNote(note: INoteResponse) {

  }


  // openEditDialog(note: INoteResponse) {
  //   const dialogRef = this.dialog.open(EditCompletedNoteDialog, {
  //     maxHeight: '100vh',
  //     data: {noteData: note},
  //     disableClose: true
  //   });
    
  //   dialogRef.afterClosed().subscribe(result => {
  //     // console.log(result);
  //     if(result){
  //       this.getCompletedNotes(0);
       
  //     }
        
  //   });
  // }

  openEditDialog(note: INoteResponse) {
    const dialogRef = this.dialog.open(EditCompletedNoteDialog, {
      maxHeight: '100vh',
      data: {noteData: note},
      disableClose: true
    });
    
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      console.log(result, this.totalnotes);
      if(result && (this.totalnotes-1) % 8 === 0 && (this.totalnotes-1) !== 0 && this.currentpage !== 0){

        this.currentpage = this.currentpage - 1;
        console.log(this.currentpage);
      }
      
      console.log(this.currentpage);

      if(this.currentpage === 0 || this.currentpage === -1)
        this.getCompletedNotes(0);
      else
        this.getCompletedNotes(this.currentpage - 1);
       
      
        
    });
  }

  // deleteNote(id: number) {
  //   this.notesService.deleteNote(id).subscribe(res => {
      
  //     // show snackbar and load the notes
  //     console.log(this.totalnotes, this.totalnotes);
  
  //     if(this.totalnotes % 8 === 0 && this.totalnotes !== 0)
  //       this.currentpage = this.currentpage - 1;

  //     this.openSnackBar('Scribble deleted!');
  //     this.getCompletedNotes(0);
  //   }, err => {
  //     this.openSnackBar('Error deleting scribble!');
  //   })
  // }
  deleteNote(id: number) {
    this.notesService.deleteNote(id).subscribe(res => {
      
      this.totalnotes -= 1;
      // show snackbar and load the notes
      this.openSnackBar('Scribble deleted!');

      if(this.totalnotes % 8 === 0 && this.totalnotes !== 0)
        this.currentpage = this.currentpage - 1;
      
      console.log(this.currentpage);
      this.getCompletedNotes(this.currentpage - 1);
    }, err => {
      this.openSnackBar('Error deleting scribble!');
    })
  }

  nextPage() {
    this.currentpage += 1;
    this.getCompletedNotes(this.currentpage - 1);
  }

  previousPage() {
    this.currentpage -= 1;
    this.getCompletedNotes(this.currentpage - 1);
  }

  isFirstPage(): boolean {
    if(this.currentpage === 1)
      return true;
  }

  isLastPage(): boolean {
    return this.lastpage;
  }

  notesEmpty() : boolean {
    return this.notesArraySize === 0;
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
  selector: 'edit-completed-note-dialog',
  templateUrl: './edit-completed-note-dialog.html',
  styleUrls: ['./edit-completed-note-dialog.css']
})
export class EditCompletedNoteDialog implements OnInit{

 

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

  isDarkTheme: Observable<boolean>;

  constructor(
    public dialogRef: MatDialogRef<EditCompletedNoteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
    private formBuilder: FormBuilder,
    private notesService: NotesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private themeService: ThemeService) {}
  
  ngOnInit(): void {

    this.isDarkTheme = this.themeService.isDarkTheme;
    console.log(this.isDarkTheme);
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
  selector: 'delete-completed-note-dialog',
  templateUrl: 'delete-completed-note-dialog.html'
})
export class DeleteCompletedNoteDialog {}

