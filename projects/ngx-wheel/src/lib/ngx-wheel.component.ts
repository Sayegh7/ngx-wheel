import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
export interface Item {
  text: string,
  color: string,
  id: any,
}
@Component({
  selector: 'ngx-wheel',
  template: `
    <canvas id='canvas' [width]='width' [height]='height'>
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
  @Input() width: number;
  @Input() items: Item[];

  wheel: any
  ngOnInit(): void {

    console.log(this.numSegments)
    console.log(this.items)
    const segments = this.items
    const numSegments = this.numSegments
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.wheel = new Winwheel({
      'numSegments'  : 8,     // Specify number of segments.
      'outerRadius'  : 212,   // Set outer radius so wheel fits inside the background.
      'textFontSize' : 28,    // Set font size as desired.
      'segments'     :        // Define segments including colour and text.
      [
         {'fillStyle' : '#eae56f', 'text' : 'Prize 1'},
         {'fillStyle' : '#89f26e', 'text' : 'Prize 2'},
         {'fillStyle' : '#7de6ef', 'text' : 'Prize 3'},
         {'fillStyle' : '#e7706f', 'text' : 'Prize 4'},
         {'fillStyle' : '#eae56f', 'text' : 'Prize 5'},
         {'fillStyle' : '#89f26e', 'text' : 'Prize 6'},
         {'fillStyle' : '#7de6ef', 'text' : 'Prize 7'},
         {'fillStyle' : '#e7706f', 'text' : 'Prize 8'}
      ],
      'animation' :   // Note animation properties passed in constructor parameters.
      {
        'type' : 'spinToStop',  // Type of animation.
        'duration' : 5, // How long the animation is to take in seconds.
        'spins'    : 8  // The number of complete 360 degree rotations the wheel is to do.
      }
    })
  }
}
