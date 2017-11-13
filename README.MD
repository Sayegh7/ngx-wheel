# ngx-wheel
ng-wheel is an open-source angular (2+) library which creates a dynamic prize-winning wheel. It is used to display predetermined winnings while appearing to be random to the user. This can be used to allow a server to determine the prize before the wheel spins, then the wheel would spin and land on the prize that the server selected.


## Demo

[Demo](https://sayegh7.github.io/ngx-wheel)

![alt text](https://doc-04-4k-docs.googleusercontent.com/docs/securesc/a5lr4ctvh3k56bc5rnfl8jo70r34qp4h/flofhdkitauektu55bd1qkc5tds4dpfa/1510538400000/13462080793723121728/13462080793723121728/1bfsSGW_EkYiA_OgtzG7MpM_JcT0LTS_J?e=view&nonce=thdngs3v43s8g&user=13462080793723121728&hash=hel70ev2um4d6ve810afg9pgv4kaopt4 "Wheel of fortune")


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

The wheel button has an id `spin` so you can style it however you like


## License

MIT © [Ahmed El Sayegh](mailto:ahmedelsayegh7@gmail.com)
