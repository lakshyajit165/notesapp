import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

import { MaterialModule } from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NotesComponent, DeleteNoteDialog, EditNoteDialog } from './components/notes/notes.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { AuthService } from './services/auth/auth.service';
import { NotesService } from './services/notes/notes.service';
import { HttpClientModule } from '@angular/common/http'; 
import { AuthGuard } from './services/auth/auth.guard';
import { AuthRouteGuard } from './services/auth/authroute.guard';
import { AboutComponent } from './components/about/about.component';
import { ArchiveComponent, DeleteCompletedNoteDialog, EditCompletedNoteDialog } from './components/archive/archive.component';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    NotesComponent,
    AddNoteComponent,
    AboutComponent,
    DeleteNoteDialog,
    EditNoteDialog,
    ArchiveComponent,
    DeleteCompletedNoteDialog,
    EditCompletedNoteDialog
  ],
   
  entryComponents: [DeleteNoteDialog, DeleteCompletedNoteDialog, EditNoteDialog, EditCompletedNoteDialog],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [AuthService, NotesService,  AuthGuard, AuthRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
