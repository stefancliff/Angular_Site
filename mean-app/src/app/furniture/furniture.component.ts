import { Component, EventEmitter, Output, ViewChild, AfterViewInit, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from "rxjs";


import { Furniture } from "../furniture/furniture.model";
import { furnitureService } from "../furniture/furniture.service";


@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.css']
})


export class FurnitureComponent implements  OnInit, AfterViewInit{

  displayedColumns: string[]=['index', 'name', 'main_material', 'colour', 'type', 'area'];
  dataSource: MatTableDataSource<Furniture>;
  furniture: Furniture[]=[];
  private furnitureSubscription: Subscription;

  @Output() furnitureCreation = new EventEmitter<Furniture>();
  @ViewChild(MatSort) sort: MatSort;

  constructor (public furnitureService: furnitureService){
    this.dataSource = new MatTableDataSource<Furniture>();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(){
    this.furnitureService.getFurniture();
    this.furnitureSubscription = this.furnitureService.getFurnitureUpdateListener()
    .subscribe((furniture: Furniture[])=>{
      this.furniture = furniture;
    });
  }

  onCreateFurniture(form: NgForm): Furniture{
    if(form.invalid){
      return;
    };

    this.furnitureService.addFurniture(form.value.name, form.value.main_material, form.value.colour, form.value.type, form.value.area, form.value.index);
    console.log(form);
    form.resetForm();

    return{
      id: null,
      name: form.value.name,
      main_material: form.value.main_material,
      colour: form.value.colour,
      type: form.value.type,
      area: form.value.area,
      index: form.value.index
    };
  };

  onDelete(furnitureindex: string){
    this.furnitureService.deleteFurniture(furnitureindex);
  };

 applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };
}
