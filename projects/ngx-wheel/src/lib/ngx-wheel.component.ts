import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
export interface Item {
  text: string,
  color: string,
  id: any,
}
@Component({
  selector: 'ngx-wheel',
  template: `
    <canvas (click)='spin()' id='canvas' [width]='width' [height]='height'>
        Canvas not supported, use another browser.
    </canvas>
`,
  styles: [
  ]
})
export class NgxWheelComponent implements OnInit, AfterViewInit {

  constructor() { }

  @Input() numSegments: number;
  @Input() height: number;
  @Input() idToLandOn: any;
  @Input() width: number;
  @Input() items: Item[];
  @Input() spinDuration: number;


  @Output() onSpinStart: EventEmitter<any> = new EventEmitter();
  @Output() onSpinComplete: EventEmitter<any> = new EventEmitter();

  wheel: any
  completedSpin: boolean = false;

  ngOnInit(): void {
  }

  spin() {
    this.onSpinStart.emit(null)
    const segmentToLandOn = this.wheel.segments.filter(x => !!x).find(({ id }) => this.idToLandOn === id)
    const segmentTheta = segmentToLandOn.endAngle - segmentToLandOn.startAngle
    this.wheel.animation.stopAngle = segmentToLandOn.endAngle - (segmentTheta / 4);
    if (!this.completedSpin) {
      this.wheel.startAnimation()
      setTimeout(() => {
        this.completedSpin = true
        this.onSpinComplete.emit(null)
      }, this.spinDuration * 1000)
    }
  }
  ngAfterViewInit() {
    const segments = this.items
    const numSegments = this.numSegments
    // @ts-ignore
    this.wheel = new Winwheel({
      numSegments,
      segments,
      'animation' :   // Note animation properties passed in constructor parameters.
      {
        'type' : 'spinToStop',  // Type of animation.
        'duration' : this.spinDuration, // How long the animation is to take in seconds.
        'spins'    : 8  // The number of complete 360 degree rotations the wheel is to do.
      }
    })
  }
}
