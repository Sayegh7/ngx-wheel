# ngx-wheel
ngx-wheel is an open-source angular (2+) library which creates a dynamic prize-winning wheel. It is used to display predetermined winnings while appearing to be random to the user. This can be used to allow a server to determine the prize before the wheel spins, then the wheel would spin and land on the prize that the server selected.


## Demo

[Demo](https://sayegh7.github.io/ngx-wheel)

![](https://raw.githubusercontent.com/Sayegh7/ngx-wheel/master/Screen%20Shot%202017-11-13%20at%204.18.16%20AM.png "Wheel of fortune")


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
<ngx-wheel prizeToWin="iPhone" [prize_descriptions]="['Car','iPhone','$200']" [colors]="['#ff0000', 'green', 'blue']"></ngx-wheel>
```

The component needs three input parameters:
- `prizeToWin` is a string that represents the prize to land on (Can be fetched from server)
- `prize_descriptions` is an array of strings that represents the prizes
- `colors` is an array of strings that represents the colors of the background of each corresponding prize

The wheel spin button has an id `spin` so you can style it however you like


## License

MIT © [Ahmed El Sayegh](mailto:ahmedelsayegh7@gmail.com)
