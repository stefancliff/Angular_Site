import {Component, NgModule, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Routes, RouterModule } from '@angular/router';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html'
})

export class InfoComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  close(){
    this.sidenav.close();
  }
  open(){
    this.sidenav.open();
  }
}


