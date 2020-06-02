import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateNote } from '../../model/ICreateNote';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private http: HttpClient
  ) { }

  createNote(note: ICreateNote) {
    
  }
}
