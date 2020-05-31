import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NotesComponent } from './components/notes/notes.component';
import { AddNoteComponent } from './components/add-note/add-note.component';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,

  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '', component: NotesComponent
      },
      {
        path: 'notes/add', component: AddNoteComponent
      }
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
