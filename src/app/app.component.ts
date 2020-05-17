import { Component, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private cdr: ChangeDetectorRef) {

  }
  title = 'angular-wheel';
  numSegments = 4
  idToLandOn = 'p4'

  before() {
    alert('befoooore')
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
