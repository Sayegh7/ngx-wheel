import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxWheelComponent } from './ngx-wheel.component';
export function NgxWheelComponentFac() {
    return new NgxWheelComponent();
};

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxWheelComponent],
  exports: [NgxWheelComponent]

})
export class NgxWheelModule { }
