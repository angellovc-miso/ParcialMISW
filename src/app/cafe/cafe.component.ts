import { Component, OnInit } from '@angular/core';
import { CafeService } from './cafe.service';
import { Cafe } from './cafe';

@Component({
  selector: 'app-cafe',
  templateUrl: './cafe.component.html',
  styleUrls: ['./cafe.component.css']
})
export class CafeComponent implements OnInit {

  cafeList: Cafe[] = [];
  cafeByType: Record<string, Cafe[]> = {};
  constructor(private cafeService: CafeService) { }

  ngOnInit() {
    this.getCafes()
  }

  getCafes() {
    this.cafeService.getCafes().subscribe(cafes => {
      this.cafeList = cafes;
      for (const cafe of this.cafeList) {
        if (this.cafeByType[cafe.tipo] === undefined)
          this.cafeByType[cafe.tipo] = [];
        this.cafeByType[cafe.tipo].push(cafe);   
      }
    });
  }

}
