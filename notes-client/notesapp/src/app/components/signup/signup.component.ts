import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, AbstractControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { IUser } from '../../model/IUser';
import { AuthService } from '../../services/auth/auth.service';
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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formGroup: FormGroup;
  user: IUser = {
    name: '',
    email: '',
    username: '',
    password: ''
  };
  status: string = 'status';
  errors: string = 'errors';
  error: string = 'error';
  success: string = 'success';
  message: string = 'message';

  matcher = new MyErrorStateMatcher();

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['',  [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      
  });
  }

  get nameValue() {
    return this.formGroup.get('name');
  }

  get emailValue() {
    return this.formGroup.get('email');
  }

  get userNameValue() {
    return this.formGroup.get('username');
  }

  get passwordValue() {
    return this.formGroup.get('password');
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.log(this.formGroup.value.email);
    this.user.email = this.formGroup.value.email;
    this.user.name = this.formGroup.value.name;
    this.user.username = this.formGroup.value.username;
    this.user.password = this.formGroup.value.password;

    this.authService.signUp(this.user).subscribe(res => {

      // success
      if(res[this.success] === true){
        
        console.log('success block');
        this.openSnackBar('Sign Up successful!');
        this.router.navigate(['login']);
       
      } 
    }, err => {
      // check for 'errors' field
      console.log(err);
      if(!err[this.success]){
        this.openSnackBar(err[this.error][this.message]);
      }else{
        this.openSnackBar('An error occurred. Please check your entries/try again');
      }

     
    });
   
  }

  resetForm() {
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();
  }



  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Close', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }


}
