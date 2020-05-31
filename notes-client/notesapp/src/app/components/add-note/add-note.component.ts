import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

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

  constructor() { }

  ngOnInit(): void {
  }

  status = [
    'NOTSTARTED',
    'ONGOING',
    'COMPLETED'
  ];

  date = new FormControl(new Date());

  titleFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(80)
  ]);

  descFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(20),
    Validators.maxLength(200)
  ]);

  statusFormControl = new FormControl('', [
    Validators.required,
  ]);

  dateFormControl = new FormControl('', [
    Validators.required,
  ]);

  priorityFormControl = new FormControl('', [
    Validators.required
  ])

  events: string[] = [];
  priority: string;
  priorities: string[] = ['HIGH', 'MEDIUM', 'LOW'];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  matcher = new MyErrorStateMatcher();


}
