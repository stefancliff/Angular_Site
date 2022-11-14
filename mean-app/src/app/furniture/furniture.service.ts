import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { map } from 'rxjs/operators';

import { Furniture } from "../furniture/furniture.model";
@Injectable({providedIn: 'root'})

export class furnitureService{
  private furniture: Furniture[] = [];
  private furnitureUpdate = new Subject<Furniture[]>();
  constructor(private http: HttpClient){};

  getFurniture(){
    return this.http.get<{message: string, furniture: Furniture[]}>("http://localhost:3000/api/furniture")
    .pipe(map((furnitureData)=>{
      return furnitureData.furniture.map(furniture =>{
        return {
          id: furniture.id,
          name: furniture.name,
          main_material: furniture.main_material,
          colour: furniture.colour,
          type: furniture.type,
          area: furniture.area,
          index: furniture.index
        };
      });
    })).subscribe((furnitureTransformedData)=>{
      this.furniture = furnitureTransformedData;
      this.furnitureUpdate.next([...this.furniture]);
    });
  };

  getFurnitureUpdateListener(){
    return this.furnitureUpdate.asObservable();
  };

  addFurniture(name: string, main_material: string, colour: string, type: string, area: string, index: string){
    const furniture: Furniture = {id:null, name: name, main_material: main_material, colour: colour, type: type, area: area, index: index};
    this.http.post<{message: string}>('http://localhost:3000/api/furniture',furniture)
    .subscribe(fetchData => {
      console.log(fetchData.message);
    });
    this.furniture.push(furniture);
    this.furnitureUpdate.next([...this.furniture]);
  };

  deleteFurniture(furnitureIndex: string){
    this.http.delete('http://localhost:3000/api/furniture/' + furnitureIndex)
    .subscribe(()=>{
      console.log('Furniture deleted!');
    });
  };


};


