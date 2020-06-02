import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, AbstractControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { AuthService } from '../../services/auth/auth.service';


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

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
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
    console.log(this.formGroup.value);
    console.log(this.formGroup.value.date.toLocaleString().split(',')[0]);
    // console.log(this.dateValue.value.toLocaleString().split(',')[0]);
    console.log(this.authService.isLoggedIn());
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
