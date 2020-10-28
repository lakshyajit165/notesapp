import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NotesService } from 'src/app/services/notes/notes.service';
import { INoteResponse } from 'src/app/model/INoteResponse';

import { ThemeService } from 'src/app/services/theme/theme.service';
import {OverlayContainer} from '@angular/cdk/overlay';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  isDarkTheme: Observable<boolean>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private themeService: ThemeService,
    private overlayContainer: OverlayContainer
  ) {
    
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.overlayContainer.getContainerElement().classList.remove('dark-theme');
    this.overlayContainer.getContainerElement().classList.add('light-theme');
  }

  toggleDarkTheme(checked: boolean) {
    console.log(checked);
    if(checked){
      this.themeService.setDarkTheme(true);
      this.themeService.setLightTheme(false);
      this.overlayContainer.getContainerElement().classList.remove('light-theme');
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
    }
    else{
      this.themeService.setDarkTheme(false);
      this.themeService.setLightTheme(true);
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
      this.overlayContainer.getContainerElement().classList.add('light-theme');
    }
  }

  routeFunction(routePath: string) {
    this.router.navigate([ routePath ]);
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['login']);
    this.openSnackBar('Logout successful!');
  }

  

  openSnackBar(msg: string) {
    
    // let theme = '';
    // console.log(msg);
    // this.themeService.isDarkTheme.subscribe(res => {
    //   theme = 'light-theme';
    // }, err => {
    //   theme = 'dark-theme';
    // });

    this._snackBar.open(msg, 'Close', {
     
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }




}
