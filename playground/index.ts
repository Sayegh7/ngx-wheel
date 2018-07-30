/**
 * This is only for local test
 */
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Component } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { NgxWheelModule } from "ngx-wheel";

@Component({
  selector: "app",
  template: `  <ngx-wheel centerText="Sayegh" [spinOnce]="spinOnce" fontColor="white" stroke="red" arrowColor="white" [spinRange]="[10,5]" (beforeSpin)="beforeSpinFn(x)" (afterSpin)="afterSpinFn(x)" prizeToWin="1" [prize_descriptions]="prizes" [colors]="colors"></ngx-wheel>`
})
class AppComponent {
  colors = [
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black"
  ];
  //10, 9, 6 ,2
  prizes = [
    "demo 1 bigass car as well be",
    "demo 2",
    "demo 3",
    "demo 4",
    "demo 5",
    "demo 6",
    "demo 7",
    "demo 8",
    "demo 9",
    "demo 10",
    "demo 11",
    "demo 12"
  ];
  beforeSpinFn = function () {
    // alert("before");
  };
  spinOnce = true;
  afterSpinFn = function () {
    // alert("after");
  };
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, NgxWheelModule]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
