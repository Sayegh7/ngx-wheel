# ngx-wheel

[![npm version](https://badge.fury.io/js/ngx-wheel.svg)](https://badge.fury.io/js/ngx-wheel)

ng-wheel is an open-source angular (2+) library which creates a dynamic prize-winning wheel. It is used to display predetermined winnings while appearing to be random to the user. This can be used to allow a server to determine the prize before the wheel spins, then the wheel would spin and land on the prize that the server selected.


## Demo

[Demo](https://sayegh7.github.io/ngx-wheel/)

![](https://image.ibb.co/hXMnCz/Screen_Shot_2018_09_03_at_3_59_52_PM.png "Wheel of fortune")


## Installation

To install this library, run:

```bash
$ npm install ngx-wheel --save
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
<!-- You can now use your library component in app.component.html -->
<ngx-wheel
    stroke="#F3D583"
    [strokeWidth]="4"
    [spinOnce]="spinOnce"
    fontColor="white"
    arrowColor="white"
    [spinRange]="[10,5]"
    [centerText]="merchant"
    [prizeToWin]="prizeToWin"
    [prize_descriptions]="prizes"
    [colors]="colors"
    (beforeSpin)="beforeSpinFn()"
    (afterSpin)="afterSpinFn()">
</ngx-wheel>
```


### Options

#### Inputs
- `arrowColor` is a string representing the color of the arrow of the wheel
- `centerText` is the text that appears in the center of the wheel
- `spinOnce` allows one spin only
- `fontColor` is a string representing the color of the text on the wheel
- `stroke` is a string representing the color of the border between wheel segments.
- `strokeWidth` is a number representing the width of the border between wheel segments.
- `prizeToWin` is a string that represents the prize to land on (Can be fetched from server)
- `prize_descriptions` is an array of strings that represents the prizes
- `colors` is an array of strings that represents the colors of the background of each corresponding prize
- `spinRange` is an array of two numbers. The first is the minimum number of spins the wheel will make. The second is the maximum number of spins. The wheel will always do a random number of spins between this range.

#### Outputs
- `beforeSpin` is called before the wheel spin
- `afterSpin` is called after the wheel spin

### Mobile

There is another component that creates a wheel that fits on mobile screens called `ngx-mobile-wheel` which can be used just like the original wheel.
```xml
<!-- You can now use your library component in app.component.html -->
<ngx-mobile-wheel
    stroke="#F3D583"
    [strokeWidth]="4"
    [spinOnce]="spinOnce"
    fontColor="white"
    arrowColor="white"
    [spinRange]="[10,5]"
    [centerText]="merchant"
    [prizeToWin]="prizeToWin"
    [prize_descriptions]="prizes"
    [colors]="colors"
    (beforeSpin)="beforeSpinFn()"
    (afterSpin)="afterSpinFn()">
</ngx-mobile-wheel>
```

## License

MIT © [Ahmed El Sayegh](mailto:ahmedelsayegh7@gmail.com)