import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, AbstractControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { IUserLogin } from '../../model/IUserLogin';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  accessToken: string = 'accessToken';
  formGroup: FormGroup;
  user: IUserLogin = {
    usernameOrEmail: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      usernameOrEmail: ['',  [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      
  });
  }

  get usernameOrEmailValue() {
    return this.formGroup.get('usernameOrEmail');
  }

  get passwordValue() {
    return this.formGroup.get('password');
  }

  onSubmit() {
    this.user.usernameOrEmail = this.formGroup.value.usernameOrEmail;
    this.user.password = this.formGroup.value.password;

    this.authService.logIn(this.user).subscribe(res => {

      // store the token in localstorage
      // console.log(res);
      localStorage.setItem('key', res[this.accessToken]);
      // navigate to home
      this.router.navigate(['/home']);
      this.openSnackBar('Login successful!');

    }, err => {
      this.openSnackBar('Bad credentials!');
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
