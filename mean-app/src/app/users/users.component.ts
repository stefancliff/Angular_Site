import { Component, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { Subscription } from "rxjs";

import { User } from "../users/users.model";
import { UserService } from "../users/users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UserComponent implements OnInit{


  user: User[]=[];
  private userSubscription: Subscription;

  @Output() userCreation = new EventEmitter<User>();
  @ViewChild(MatSort) sort: MatSort;

  constructor (public userService: UserService){

  };

  ngOnInit(){
    this.userService.getUsers();
    this.userSubscription = this.userService.getUserUpdateListener()
    .subscribe((user: User[])=>{
      this.user = user;
    });
  };


  onCreateUser(form: NgForm){
    if(form.invalid){
      return;
    }

    this.userService.addUser(form.value.fname, form.value.lname, form.value.email, form.value.password, form.value.index);
    console.log(form);
    form.resetForm();
  };

  onDelete(userIndex: string){
    this.userService.deleteUser(userIndex);
  };

};
