import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';

const materialComponents = [
   MatCardModule,
   MatButtonModule,
   MatInputModule,
   MatDividerModule,
   MatSidenavModule,
   MatToolbarModule,
   MatIconModule,
   MatListModule,
   MatChipsModule,
   MatSelectModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatRadioModule,
   MatFormFieldModule
];

@NgModule({

    imports: [materialComponents],
    exports: [materialComponents]
  })

export class MaterialModule { }