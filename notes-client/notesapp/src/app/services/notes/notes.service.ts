import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateNote } from '../../model/ICreateNote';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private http: HttpClient
  ) { }

  serviceRoute = 'http://localhost:5000/';

  


  createNote(note: ICreateNote): Observable<object>{

    let requestHeader = this.getHeaders();

    // console.log(localStorage.getItem('key'));
    return this.http.post(this.serviceRoute + 'api/v1/notes', note, { headers: requestHeader });
    
  }

  getMyNotes(page: number): Observable<object> {
    
    let requestHeader = this.getHeaders();
    return this.http.get(this.serviceRoute + `api/v1/notes/mynotes?page=${page}&size=8`, { headers: requestHeader });
    
  }

  getHeaders() : HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('key')
    });
  }

  
}
