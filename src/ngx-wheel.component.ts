import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  AfterViewChecked,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "ngx-wheel",
  templateUrl: "./ngx-wheel.component.html",
  styleUrls: ["./ngx-wheel.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class NgxWheelComponent implements OnInit, AfterViewChecked {
  @Input() colors: Array<string>;
  @Input() fontColor: any;
  @Input() arrowColor: any;
  @Input() spinOnce: Boolean;
  @Input() spinRange: Array<any>;
  @Input() prizeToWin: string;
  @Input() centerText: string;
  @Input() prize_descriptions: Array<string>;

  @Output() beforeSpin: EventEmitter<any> = new EventEmitter<any>();
  @Output() afterSpin: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    while (!this.prize_descriptions);
    this.init();
    this.drawSpinnerWheel();
  }

  ngAfterViewChecked() {}

  arcDeg: any;
  startAngle: any;
  arc: any;
  angleNeeded: any;
  spins: any;
  angleToBeSpun: any;
  spinTimeout: any;
  spinArcStart: any;
  spinTime: any;
  spinTimeTotal: any;
  current_user_status: any;
  spin_results: any;
  ctx: any;
  spinAngleStart = 0;
  spun = false;
  dragging = false;
  disableSpinBtn = false;
  container: any = document.getElementById("container2");
  target: any = document.getElementById("ng-wheel-canvas");

  init() {
    if (this.spinOnce == undefined) {
      this.spinOnce == true;
    }
    this.arcDeg = 360 / this.prize_descriptions.length;
    this.startAngle = this.arcDeg / 2 * Math.PI / 180;
    this.arc = this.arcDeg * Math.PI / 180; //Math.PI / 4;
    this.angleNeeded = this.getAngleNeeded(this.prizeToWin);
    if (this.spinRange) {
      this.spins =
        Math.floor(Math.random() * this.spinRange[1]) + this.spinRange[0];
    } else {
      this.spins = Math.floor(Math.random() * 5) + 1;
    }
    this.angleToBeSpun = this.angleNeeded + this.spins * 360;
    this.spinTimeout = null;
    this.spinArcStart = 0;
    this.spinTime = 0;
    this.spinTimeTotal = 0;
    this.current_user_status = null;
    this.spin_results = null;
    this.ctx = null;
    var canvas: any = document.getElementById("ng-wheel-canvas");
    var arrowCanvas: any = document.getElementById("arrow-canvas");

    document.addEventListener("touchstart", this.handleStart.bind(this), false);
    document.addEventListener("mousedown", this.handleStart.bind(this), false);

    // listen while dragging
    document.addEventListener("touchend", this.handleEnd.bind(this), false);
    document.addEventListener("mouseup", this.handleEnd.bind(this), false);

    // listen after dragging is complete
    arrowCanvas.addEventListener(
      "touchmove",
      this.handleMove.bind(this),
      false
    );
    arrowCanvas.addEventListener(
      "mousemove",
      this.handleMove.bind(this),
      false
    );
  }

  getAngleNeeded(prize) {
    var degrees = this.startAngle * 180 / Math.PI + 90;
    var arcd = this.arc * 180 / Math.PI;
    var currentIndex = Math.floor((360 - degrees % 360) / arcd);
    var neededIndex = this.prize_descriptions.indexOf(prize);
    if (this.prize_descriptions.length == 6) {
      arcd -= 10;
    }

    if (this.prize_descriptions.length == 9) {
      arcd -= 5;
    }

    if (this.prize_descriptions.length == 10) {
      arcd -= 5;
    }
    if (currentIndex == neededIndex) {
      return 0;
    }
    if (currentIndex > neededIndex) {
      return arcd * (currentIndex - neededIndex);
    }
    return (
      arcd * (currentIndex + (this.prize_descriptions.length - neededIndex))
    );
  }

  drawSpinnerWheel() {
    var canvas: any = document.getElementById("ng-wheel-canvas");
    if (canvas.getContext) {
      var outsideRadius = 200;
      var textRadius = 160;
      var insideRadius = 100;

      this.ctx = canvas.getContext("2d");
      this.ctx.clearRect(0, 0, 500, 500);

      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 2;

      for (var i = 0; i < this.prize_descriptions.length; i++) {
        var angle = this.startAngle + i * this.arc;
        this.ctx.fillStyle = this.colors[i];

        this.ctx.beginPath();
        this.ctx.arc(250, 250, outsideRadius, angle, angle + this.arc, false);
        this.ctx.arc(250, 250, 0, angle + this.arc, angle, true);
        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.save();
        this.ctx.shadowOffsetX = -1;
        this.ctx.shadowOffsetY = -1;
        this.ctx.shadowBlur = 0;
        // this.ctx.shadowColor = "rgb(220,220,220)";
        this.ctx.fillStyle = this.fontColor;
        this.ctx.translate(
          250 + Math.cos(angle + this.arc / 2) * textRadius,
          250 + Math.sin(angle + this.arc / 2) * textRadius
        );
        this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
        this.ctx.font = "bold 20px Helvetica, Arial";

        var text;
        if (this.prize_descriptions[i] === undefined) {
          text = "Not this time!";
        } else {
          text = this.prize_descriptions[i];
        }

        this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
        this.ctx.restore();
      }
      var arrowCanvas: any = document.getElementById("arrow-canvas");
      var arrowCtx = arrowCanvas.getContext("2d");

      //Arrow
      // arrowCtx.save();
      arrowCtx.fillStyle = "white";
      arrowCtx.beginPath();
      arrowCtx.arc(250, 250, 100, 0, 2 * Math.PI, false);
      arrowCtx.stroke();
      arrowCtx.fill();
      arrowCtx.font = "bold 30px Helvetica, Arial";
      arrowCtx.fillStyle = "black";
      arrowCtx.fillText(
        this.centerText,
        250 - arrowCtx.measureText(this.centerText).width / 2,
        250 + 10
      );
      arrowCtx.fillStyle = this.arrowColor;

      arrowCtx.beginPath();
      arrowCtx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      arrowCtx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      arrowCtx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      arrowCtx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      arrowCtx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      arrowCtx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      arrowCtx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      arrowCtx.lineTo(250 - 4, 250 - (outsideRadius + 5));
      arrowCtx.fill();
      // arrowCtx.restore();
    }
  }
  spin() {
    this.spinAngleStart = this.angleToBeSpun / 32.807503994186335; //31.907503994186335 degrees per number;
    this.spinTime = 0;
    this.spinTimeTotal = 2 * 3 + 4 * 1000;
    this.rotateWheel();
  }
  easeOut(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }

  rotateWheel() {
    this.spinTime += 30;
    if (this.spinTime >= this.spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }
    var spinAngle =
      this.spinAngleStart -
      this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
    var degrees = spinAngle * 180 / Math.PI + 90;
    var arcd = this.arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    this.startAngle += spinAngle * Math.PI / 180;
    this.drawSpinnerWheel();
    var that = this;
    this.spinTimeout = setTimeout(function() {
      that.rotateWheel();
    }, 10);
  }

  stopRotateWheel() {
    clearTimeout(this.spinTimeout);
    var degrees = this.startAngle * 180 / Math.PI + 90;
    var arcd = this.arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    this.ctx.save();
    this.ctx.font = "bold 30px Helvetica, Arial";
    var text = this.prize_descriptions[index];
    this.ctx.fillText(
      text,
      250 - this.ctx.measureText(text).width / 2,
      250 + 10
    );
    this.ctx.restore();
    if (this.afterSpin) this.afterSpin.emit(1);
  }

  canSpin() {
    return (this.spinOnce && !this.spun) || !this.spinOnce;
  }

  disableButton() {
    if (this.spinOnce) {
      return this.spun;
    }
    return false;
  }

  clicked() {
    // this.disableSpinBtn = this.disableButton();
    if (!this.canSpin()) return;
    this.spun = true;

    if (this.beforeSpin) {
      this.beforeSpin.emit({});
      console.log("I emitted");
    }
    this.spin();
  }

  // Helper Functions
  // Gets the position of the top border of the element
  findTop(element) {
    var rec = element.getBoundingClientRect();
    return rec.top + window.scrollY;
  }

  // Gets the position of the left border of the element
  findLeft(element) {
    var rec = element.getBoundingClientRect();
    return rec.left + window.scrollX;
  }

  handleStart(e) {
    // at the start of the drag process, set the dragging flag to true
    this.dragging = true;
  }
  handleMove(e) {
    // if the user is dragging
    if (this.dragging) {
      var container: any = document.getElementById("container2");

      // get the center of the wheel as an array of [x, y]
      var targetCenter = [
        this.findLeft(container) + container.offsetWidth / 2,
        this.findTop(container) + container.offsetHeight / 2
      ];

      // get the angle needed to rotate the wheel to follow the mouse/touch
      var angle = Math.round(
        Math.atan2(e.pageX - targetCenter[0], -(e.pageY - targetCenter[1])) *
          (180 / Math.PI)
      );

      // add css to rotate
      var styleString = "";
      styleString += "-webkit-transform: rotate(" + angle + "deg);";
      styleString += "-moz-transform: rotate(" + angle + "deg);";
      styleString += "transform: rotate(" + angle + "deg);";

      var canvas: any = document.getElementById("ng-wheel-canvas");

      // set the style to the css
      canvas.setAttribute("style", styleString);
    }
    e.preventDefault();
  }

  handleEnd(e) {
    // set the dragging to false
    this.dragging = false;

    // create css to rotate the wheel back to how it was
    var degree = 0;
    var styleString = "";
    styleString += "-moz-transform: rotate(" + degree + "deg);";
    styleString += "-moz-transform-origin: 50% 50%;";
    styleString += "-webkit-transform: rotate(" + degree + "deg);";
    styleString += "-webkit-transform-origin: 50% 50%;";
    styleString += "-o-transform: rotate(" + degree + "deg);";
    styleString += "-o-transform-origin: 50% 50%;";
    styleString += "-ms-transform: rotate(" + degree + "deg);";
    styleString += "-ms-transform-origin: 50% 50%;";

    var canvas: any = document.getElementById("ng-wheel-canvas");
    // set the style to the css
    canvas.setAttribute("style", styleString);

    // after the wheel is upright again, spin the wheel
    this.clicked();
    // this.spin();
  }
}
