import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';

const materialComponents = [
   MatCardModule,
   MatButtonModule,
   MatInputModule,
   MatDividerModule
];

@NgModule({

    imports: [materialComponents],
    exports: [materialComponents]
  })

export class MaterialModule { }
