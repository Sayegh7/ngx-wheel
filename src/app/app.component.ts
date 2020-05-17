import { Component, ViewChild } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  @ViewChild(NgxWheelComponent, { static: false }) wheel;


  seed = [...Array(12).keys()]
  idToLandOn: any;
  items: any[];
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL
  textAlignment: TextAlignment = TextAlignment.OUTER
  ngOnInit(){
    this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];
    const colors = ['#FF0000', '#000000']
    this.items = this.seed.map((value) => ({
      fillStyle: colors[value % 2],
      text: `Prize ${value}`,
      id: value,
      textFillStyle: 'white',
      textFontSize: '16'
    }))
  }

  before() {
    alert('Your wheel is about to spin')
  }

  spin(prize) {
    this.idToLandOn = prize
    setTimeout(() => {
      this.wheel.spin()
    }, 0);
  }

  after() {
    alert('You have been bamboozled')
  }
}
