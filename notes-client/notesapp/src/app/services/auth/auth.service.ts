import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../../model/IUser';
import { IUserLogin } from '../../model/IUserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serviceRoute = 'http://localhost:5000/';
  constructor(
    private http: HttpClient
  ) { }

  signUp(user: IUser): Observable<object> {
    return this.http.post(this.serviceRoute + 'api/v1/auth/signup', user);
  }

  logIn(user: IUserLogin): Observable<object> {
    return this.http.post(this.serviceRoute + 'api/v1/auth/signin', user);
  }

  logOut() {
    localStorage.removeItem('key');
    localStorage.clear();
  }

  isLoggedIn(): boolean {
   // console.log(localStorage.getItem('key'));
    if(localStorage.getItem('key'))
      return true;
    return false;
  }
}
