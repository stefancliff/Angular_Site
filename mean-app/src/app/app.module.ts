import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { UserComponent } from './users/users.component'
import { FurnitureComponent} from './furniture/furniture.component'

const routes: Routes =[
  { path:'users', component:UserComponent },
  { path:'furniture', component:FurnitureComponent},
  { path:'home', component:HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    UserComponent,
    FurnitureComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    CommonModule,
    RouterModule.forRoot(routes),
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[
    RouterModule
  ]
})
export class AppModule { }
