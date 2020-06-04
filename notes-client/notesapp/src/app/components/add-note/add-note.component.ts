import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, AbstractControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { AuthService } from '../../services/auth/auth.service';
import { ICreateNote } from 'src/app/model/ICreateNote';
import { NotesService } from 'src/app/services/notes/notes.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  formGroup: FormGroup;
  status = [
    'NOTSTARTED',
    'ONGOING',
    'COMPLETED'
  ];

  events: string[] = [];
  priority: string;
  priorities: string[] = ['HIGH', 'MEDIUM', 'LOW'];

  note: ICreateNote = {
    title: '',
    description: '',
    status: '',
    dueDate: '',
    priority: ''
  }

  loading: boolean = false;
  mindate: Date = new Date();  

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notesService: NotesService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
        title: ['',  [Validators.required, Validators.minLength(10), Validators.maxLength(80)]],
        status: ['', [Validators.required]],
        date: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
        priority: [this.priority, [Validators.required]]
    });
  
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
    
    this.notesService.createNote(this.note).subscribe(res => {
        this.loading = false;
        this.router.navigate(['/home']);
        this.openSnackBar('Scribble created successfully!')
    }, err => {
        this.loading = false;
        this.openSnackBar('An error occurred!')
    })

  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Close', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  

  // date = new FormControl(new Date());

  
  // titleFormControl = new FormControl('', [
   
  // ]);

  // descFormControl = new FormControl('', [
    
  // ]);

  // statusFormControl = new FormControl('', [
    
  // ]);

  // dateFormControl = new FormControl('', [
    
  // ]);

  // priorityFormControl = new FormControl('', [
    
  // ])

  


}
