import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CafeComponent } from './cafe.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CafeComponent
  ],
  declarations: [CafeComponent]
})
export class CafeModule { }
