import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { NotesComponent } from './components/notes/notes.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { AuthRouteGuard } from './services/auth/authroute.guard';
import { ArchiveComponent } from './components/archive/archive.component';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthRouteGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: NotesComponent, canActivateChild: [AuthGuard]
      },
      {
        path: 'about', component: AboutComponent, canActivateChild: [AuthGuard]
      },
      {
        path: 'scribbles/add', component: AddNoteComponent, canActivateChild: [AuthGuard]
      },
      {
        path: 'scribbles/archive', component: ArchiveComponent, canActivateChild: [AuthGuard]
      }
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
