import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

const materialComponents = [
   MatCardModule,
   MatButtonModule,
   MatInputModule,
   MatDividerModule,
   MatSidenavModule,
   MatToolbarModule,
   MatIconModule,
   MatListModule
];

@NgModule({

    imports: [materialComponents],
    exports: [materialComponents]
  })

export class MaterialModule { }
