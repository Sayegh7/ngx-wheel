import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgxWheelComponent } from 'ngx-wheel'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  @ViewChild(NgxWheelComponent, { static: false }) wheel;


  idToLandOn = ['p1', 'p2', 'p3', 'p4'][Math.floor(Math.random() * 4)];

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
  items = [
    {
      fillStyle: '#ff0000',
      text: 'prize 1',
      id: 'p1'
    },
    {
      fillStyle: '#00ff00',
      text: 'prize 2',
      id: 'p2'
    },
    {
      fillStyle: '#0000ff',
      text: 'prize 3',
      id: 'p3'
    },
    {
      fillStyle: '#0000ff',
      text: 'prize 4',
      id: 'p4'
    },
  ]
}
