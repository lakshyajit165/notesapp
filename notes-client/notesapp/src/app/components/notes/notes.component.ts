import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes/notes.service';
import { INoteResponse } from 'src/app/model/INoteResponse';


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

  constructor(
    private notesService: NotesService
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
}
