import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';


import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatCardModule, MatToolbarModule, MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatGridListModule,
    MatIconModule,
    MatTreeModule,
    MatDialogModule,
    MatProgressBarModule,
    MatListModule,
    MatPaginatorModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, MatCardModule, MatToolbarModule, MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatGridListModule,
    MatIconModule,
    MatTreeModule,
    MatDialogModule,
    MatProgressBarModule,
    MatListModule,
    MatPaginatorModule
  ]
})

export class MyNgModule { }