import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxWheelComponent } from "./ngx-wheel.component";
import { NgxMobileWheelComponent } from "./ngx-mobile-wheel.component";
export function NgxWheelComponentFac() {
  return new NgxWheelComponent();
}
export function NgxMobileWheelComponentFac() {
  return new NgxMobileWheelComponent();
}

@NgModule({
  imports: [CommonModule],
  declarations: [NgxWheelComponent, NgxMobileWheelComponent],
  exports: [NgxWheelComponent, NgxMobileWheelComponent]
})
export class NgxWheelModule {}
