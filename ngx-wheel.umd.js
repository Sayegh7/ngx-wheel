(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['ngx-wheel'] = {}),global.core,global.common));
}(this, (function (exports,core,common) { 'use strict';

var NgxWheelComponent = (function () {
    function NgxWheelComponent() {
        this.spinAngleStart = 0;
        this.spun = false;
    }
    /**
     * @return {?}
     */
    NgxWheelComponent.prototype.ngOnInit = function () {
        this.init();
        this.drawSpinnerWheel();
    };
    /**
     * @return {?}
     */
    NgxWheelComponent.prototype.ngAfterViewChecked = function () {
    };
    /**
     * @return {?}
     */
    NgxWheelComponent.prototype.init = function () {
        this.arcDeg = (360 / (this.prize_descriptions.length));
        this.startAngle = this.arcDeg / 2 * Math.PI / 180;
        this.arc = this.arcDeg * Math.PI / 180; //Math.PI / 4;
        this.angleNeeded = this.getAngleNeeded(this.prizeToWin);
        this.spins = Math.floor(Math.random() * 5);
        this.angleToBeSpun = this.angleNeeded + (this.spins * 360);
        this.spinTimeout = null;
        this.spinArcStart = 0;
        this.spinTime = 0;
        this.spinTimeTotal = 0;
        this.current_user_status = null;
        this.spin_results = null;
        this.ctx = null;
    };
    /**
     * @param {?} prize
     * @return {?}
     */
    NgxWheelComponent.prototype.getAngleNeeded = function (prize) {
        var /** @type {?} */ degrees = this.startAngle * 180 / Math.PI + 90;
        var /** @type {?} */ arcd = this.arc * 180 / Math.PI;
        var /** @type {?} */ currentIndex = Math.floor((360 - degrees % 360) / arcd);
        var /** @type {?} */ neededIndex = this.prize_descriptions.indexOf(prize);
        if (currentIndex == neededIndex) {
            return 0;
        }
        if (currentIndex > neededIndex) {
            return arcd * (currentIndex - neededIndex);
        }
        return arcd * (currentIndex + (this.prize_descriptions.length - neededIndex));
    };
    /**
     * @return {?}
     */
    NgxWheelComponent.prototype.drawSpinnerWheel = function () {
        var /** @type {?} */ canvas = document.getElementById("ng-wheel-canvas");
        if (canvas.getContext) {
            var /** @type {?} */ outsideRadius = 200;
            var /** @type {?} */ textRadius = 160;
            var /** @type {?} */ insideRadius = 100;
            this.ctx = canvas.getContext("2d");
            this.ctx.clearRect(0, 0, 500, 500);
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 2;
            this.ctx.font = 'bold 12px Helvetica, Arial';
            for (var /** @type {?} */ i = 0; i < this.prize_descriptions.length; i++) {
                var /** @type {?} */ angle = (this.startAngle) + (i * this.arc);
                this.ctx.fillStyle = this.colors[i];
                this.ctx.beginPath();
                this.ctx.arc(250, 250, outsideRadius, angle, angle + this.arc, false);
                this.ctx.arc(250, 250, insideRadius, angle + this.arc, angle, true);
                this.ctx.stroke();
                this.ctx.fill();
                this.ctx.save();
                this.ctx.shadowOffsetX = -1;
                this.ctx.shadowOffsetY = -1;
                this.ctx.shadowBlur = 0;
                // this.ctx.shadowColor = "rgb(220,220,220)";
                this.ctx.fillStyle = "black";
                this.ctx.translate(250 + Math.cos(angle + this.arc / 2) * textRadius, 250 + Math.sin(angle + this.arc / 2) * textRadius);
                this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
                var /** @type {?} */ text;
                if (this.prize_descriptions[i] === undefined) {
                    text = "Not this time!";
                }
                else {
                    text = this.prize_descriptions[i];
                }
                this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
                this.ctx.restore();
            }
            //Arrow
            this.ctx.fillStyle = "black";
            this.ctx.beginPath();
            this.ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
            this.ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
            this.ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
            this.ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
            this.ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
            this.ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
            this.ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
            this.ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
            this.ctx.fill();
        }
    };
    /**
     * @return {?}
     */
    NgxWheelComponent.prototype.spin = function () {
        this.spinAngleStart = this.angleToBeSpun / 32.807503994186335; //31.907503994186335 degrees per number;
        this.spinTime = 0;
        this.spinTimeTotal = 2 * 3 + 4 * 1000;
        this.rotateWheel();
    };
    /**
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    NgxWheelComponent.prototype.easeOut = function (t, b, c, d) {
        var /** @type {?} */ ts = (t /= d) * t;
        var /** @type {?} */ tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    };
    /**
     * @return {?}
     */
    NgxWheelComponent.prototype.rotateWheel = function () {
        this.spinTime += 30;
        if (this.spinTime >= this.spinTimeTotal) {
            this.stopRotateWheel();
            return;
        }
        var /** @type {?} */ spinAngle = this.spinAngleStart - this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
        this.startAngle += (spinAngle * Math.PI / 180);
        this.drawSpinnerWheel();
        var /** @type {?} */ that = this;
        this.spinTimeout = setTimeout(function () {
            that.rotateWheel();
        }, 10);
    };
    /**
     * @return {?}
     */
    NgxWheelComponent.prototype.stopRotateWheel = function () {
        clearTimeout(this.spinTimeout);
        var /** @type {?} */ degrees = this.startAngle * 180 / Math.PI + 90;
        var /** @type {?} */ arcd = this.arc * 180 / Math.PI;
        var /** @type {?} */ index = Math.floor((360 - degrees % 360) / arcd);
        this.ctx.save();
        this.ctx.font = 'bold 30px Helvetica, Arial';
        var /** @type {?} */ text = this.prize_descriptions[index];
        this.ctx.fillText(text, 250 - this.ctx.measureText(text).width / 2, 250 + 10);
        this.ctx.restore();
    };
    /**
     * @return {?}
     */
    NgxWheelComponent.prototype.clicked = function () {
        this.spun = true;
        this.spin();
    };
    return NgxWheelComponent;
}());
NgxWheelComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ngx-wheel',
                template: "<div>\n    <div class=\"center\">\n      <button [disabled]=\"spun\" (click)=\"clicked()\" id=\"spin\">Spin</button>\n    </div>\n    <div class=\"center\">\n      <canvas id=\"ng-wheel-canvas\" width=\"500\" height=\"500\"></canvas>\n    </div>\n  </div>\n",
                // styleUrls: ['./ngx-wheel.component.css'],
                encapsulation: core.ViewEncapsulation.None
            },] },
];
/**
 * @nocollapse
 */
NgxWheelComponent.ctorParameters = function () { return []; };
NgxWheelComponent.propDecorators = {
    'colors': [{ type: core.Input },],
    'prizeToWin': [{ type: core.Input },],
    'prize_descriptions': [{ type: core.Input },],
};

/**
 * @return {?}
 */


var NgxWheelModule = (function () {
    function NgxWheelModule() {
    }
    return NgxWheelModule;
}());
NgxWheelModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                declarations: [NgxWheelComponent],
                exports: [NgxWheelComponent]
            },] },
];
/**
 * @nocollapse
 */
NgxWheelModule.ctorParameters = function () { return []; };

exports.NgxWheelModule = NgxWheelModule;
exports.NgxWheelComponent = NgxWheelComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
