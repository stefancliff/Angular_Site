import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserComponent } from './users/users.component'
import { FurnitureComponent} from './furniture/furniture.component'
import { HomeComponent } from './home/home.component';

  const routes: Routes =[
    { path:'users', component:UserComponent },
    { path:'furniture', component:FurnitureComponent},
    { path:'home', component:HomeComponent}
  ];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:
  [

  ]
})

export class AppRoutingModule {}
