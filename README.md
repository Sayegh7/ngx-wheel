# ngx-wheel

[![npm version](https://badge.fury.io/js/ngx-wheel.svg)](https://badge.fury.io/js/ngx-wheel)
![npm](https://img.shields.io/npm/dt/ngx-wheel.svg)

ng-wheel is an open-source angular (2+) library which creates a dynamic prize-winning wheel. It is used to display predetermined winnings while appearing to be random to the user. This can be used to allow a server to determine the prize before the wheel spins, then the wheel would spin and land on the prize that the server selected.

<p align="center">
  <img src="https://image.ibb.co/hXMnCz/Screen_Shot_2018_09_03_at_3_59_52_PM.png" alt="ngx-wheel" width="300" height="300">
</p>

## Installation

To install this library, run:

```bash
$ npm install ngx-wheel --save
```

Then inside your `index.html` file located in the `src` directory add these 2 lines to the `<head>` tag:
```html
<script src="https://rawcdn.githack.com/zarocknz/javascript-winwheel/229a47acc3d7fd941d72a3ba9e1649751fd10ed5/Winwheel.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>

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
  width='400'
  height='400'
  spinDuration='8'
  [items]='items'
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
- `idToLandOn` is the `id` value of the `item` to land on (Can be fetched from server)
- `items` is an array of segments which have the following format:
```json
{
  "fillStyle": "#FF0000", // color
  "text": "Prize 1", // text
  "id": "p1", // id of prize (can be any type)
}
```
- `onSpinStart` and `onSpinComplete` are hooks. The passed functions will be called before the spin and after the spin completes.

#### Outputs
- `beforeSpin` is called before the wheel spin
- `afterSpin` is called after the wheel spin

## License

MIT © [Ahmed El Sayegh](mailto:ahmedelsayegh7@gmail.com)
