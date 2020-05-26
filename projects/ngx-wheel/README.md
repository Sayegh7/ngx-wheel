# ngx-wheel

## [Click here for demo](https://ngx-wheel.web.app/)

[![npm version](https://badge.fury.io/js/ngx-wheel.svg)](https://badge.fury.io/js/ngx-wheel)
![npm](https://img.shields.io/npm/dt/ngx-wheel.svg)

ngx-wheel is an open-source Angular library which creates a dynamic prize-winning wheel. It is used to display predetermined winnings while appearing to be random to the user. This can be used to allow a server to determine the prize before the wheel spins, then the wheel would spin and land on the prize that the server selected.

<p align="center">
<img src="https://i.ibb.co/mHK67T9/example.png" width=200 height=200 alt="example" border="0"></p>

## Installation

To install this library, run:

```bash
$ npm install ngx-wheel --save
```

Then inside your `index.html` file located in the `src` directory add these 2 lines to the `<head>` tag:
```html
<script src="https://rawcdn.githack.com/zarocknz/javascript-winwheel/229a47acc3d7fd941d72a3ba9e1649751fd10ed5/Winwheel.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>

```

## Usage

Import the module
```typescript
import { NgxWheelModule } from 'ngx-wheel'; //<-- import here

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxWheelModule  //<-- and here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its main component, ngx-wheel in your Angular application:

```xml
<ngx-wheel
  width='600'
  height='600'
  spinDuration='8'
  [disableSpinOnClick]='true'
  [items]='items'
  [innerRadius]='50'
  [spinAmount]='10'
  [textOrientation]='textOrientation'
  [textAlignment]='textAlignment'
  pointerStrokeColor='red'
  pointerFillColor='purple'
  [idToLandOn]='idToLandOn'
  (onSpinStart)='before()'
  (onSpinComplete)='after()'
>
</ngx-wheel>
```


### Options

#### Inputs
- `height` is the height of the wheel canvas
- `width` is the width of the wheel canvas
- `spinDuration` is the number of seconds the wheel wil be spinning for
- `spinAmount` is the number of spins the wheel will make before stopping
- `innerRadius` is the inner radius of the wheel. Allows you to make the wheel hollow from the center
- `pointerStrokeColor` is the color of the pointer's stroke
- `pointerFillColor` is the color of the pointer's fill
- `textAlignment` and `textOrientation` both have the types `TextAlignment` and `TextOrientation`, respectively. Check the [Full Reference](http://dougtesting.net/winwheel/docs/tut6_text_alignment) for visual examples.
- `disableSpinOnClick` disabled the default behaviour of spinning the wheel on clicking it. See [this section](#spinning-with-your-own-button)
- `idToLandOn` is the `id` value of the `item` to land on (Can be fetched from server)
- `items` is an array of of JSON objects that represent thw wheel's segments. Check the [Full Reference](http://dougtesting.net/winwheel/refs/class_segment) for more details.
#### Outputs
- `onSpinStart` is called before the wheel spin
- `onSpinComplete` is called after the wheel spin

### Accessing wheel functions

A couple of common use cases that were frequently requested was the ability to spin the wheel on button click and re-spinning the wheel. This is easily doable in version 4+.

- Pass `true` to the `disableSpinOnClick` prop to disable spinning when clicking on the wheel. This is optional.

- Add a ref `#wheel` to the wheel (any name works):
```xml
<ngx-wheel
  #wheel
  width='600'
  height='600'
  spinDuration='8'
  [disableSpinOnClick]='true'
  [items]='items'
  [innerRadius]='50'
  [spinAmount]='10'
  pointerStrokeColor='red'
  pointerFillColor='purple'
  [idToLandOn]='idToLandOn'
  (onSpinStart)='before()'
  (onSpinComplete)='after()'
>
</ngx-wheel>
```
- In your parent component ts file, refer to the wheel using `ViewChild`
```typescript
import { ..., ViewChild, ... } from '@angular/core';
import { NgxWheelComponent } from 'ngx-wheel';

// ...

export class ParentComponent {
   @ViewChild(NgxWheelComponent, { static: false }) wheel;

   ngAfterViewInit() {
      console.log('only after THIS EVENT "wheel" is usable!!');
      // Call the spin function whenever and wherever you want after the AfterViewInit Event
      this.wheel.spin();
   }

   reset(){
      // Reset allows you to redraw the wheel
      // Use it after any change to wheel configurations or to allow re-spinning
      this.wheel.reset();
   }
}
```

One thing to keep in mind when using the spin function this way. If you want to change the `idToLandOn`, you need to wait for a tick before calling the `spin` function in order for the update to propagate:
```typescript
  async spin(prize) {
    this.idToLandOn = prize
    await new Promise(resolve => setTimeout(resolve, 0)); // Wait here for one tick
    this.wheel.spin()
  }
```

## License

MIT © [Ahmed El Sayegh](mailto:ahmedelsayegh7@gmail.com)
