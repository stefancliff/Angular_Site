import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subject } from "rxjs";

import { map } from 'rxjs/operators';

import { User } from "../users/users.model";

@Injectable({providedIn: 'root'})

export class UserService{
  private users: User[] = [];
  private usersUpdate = new Subject<User[]>();
  constructor(private http: HttpClient){}

    getUsers(){
      this.http.get<{message: string, users: User[]}>("http://localhost:3000/api/users")
        .pipe(map((userData)=>{
          return userData.users.map(user =>{
            return {
              fname: user.fname,
              lname: user.lname,
              email: user.email,
              password: user.password,
              index: user.index,
              id: user.id
            };
          });
        }))
        .subscribe((userTransformedData)=>{
          this.users = userTransformedData;
          this.usersUpdate.next([...this.users]);
        });
    };

    getUserUpdateListener(){
      return this.usersUpdate.asObservable();
    };

    addUser(fname: string, lname:string, email:string, password:string, index:string){
      const user: User = {id: null, fname: fname, lname: lname, email: email, password: password, index: index};
      this.http.post<{message: string}>('http://localhost:3000/api/users',user)
      .subscribe(fetchData => {
        console.log(fetchData.message);
      });
      this.users.push(user);
      this.usersUpdate.next([...this.users]);
    };

    deleteUser(userIndex: string){
      this.http.delete('http://localhost:3000/api/users/' + userIndex)
      .subscribe(() => {
        console.log('User deleted!');
      })
    }

}
