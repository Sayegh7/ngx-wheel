var colors = [
  "#eaeaea",
  "black",
  "cyan",
  "orange",
  "green",
  "#ff0000",
  "yellow",
  "#cccccc"
];
// NEED to pre load this data prior
var prize_descriptions = [
  "ipod",
  "lamborghini",
  "race car",
  "something",
  "clown",
  "BMW m3",
  "million $",
  "2 million $"
];
// PRIZE DETERMINATION
var prizeToWin = "million $"

var prize_angles = []

var arcDeg = (360 / (prize_descriptions.length))
var startAngle = arcDeg/2* Math.PI / 180;
var arc = arcDeg * Math.PI / 180 //Math.PI / 4;

for (var i = 0; i < prize_descriptions.length; i++) {
  prize_angles[i] = {
    text: prize_descriptions[i],
    startAngle: i * arcDeg % 360,
    endAngle: (i + 1) * arcDeg % 360
  }
}

var angleNeeded = getAngleNeeded(prizeToWin)
var spins = Math.floor(Math.random()*5)
var angleToBeSpun = angleNeeded + (spins * 360)
var current_user_status = {};

var spinTimeout = null;

var spinArcStart = 0;
var spinTime = 0;
var spinTimeTotal = 0;

var current_user_status = null;
var spin_results = null;

var ctx;

function getAngleNeeded(prize) {
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var currentIndex = Math.floor((360 - degrees % 360) / arcd);
  var neededIndex = prize_descriptions.indexOf(prize);
  if (currentIndex == neededIndex) {
    return 0
  }
  if (currentIndex > neededIndex) {
    return arcd* (currentIndex - neededIndex)
  }
  return arcd* (currentIndex + (prize_descriptions.length-neededIndex))

}

function drawSpinnerWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 100;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = 'bold 12px Helvetica, Arial';

    for (var i = 0; i < prize_descriptions.length; i++) {
      var angle = (startAngle) + (i * arc);
      ctx.fillStyle = colors[i];

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur = 0;
      // ctx.shadowColor = "rgb(220,220,220)";
      ctx.fillStyle = "black";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text;
      if (prize_descriptions[i] === undefined) {
        text = "Not this time!";
      } else {
        text = prize_descriptions[i];
      }

      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }

    //Arrow
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}

function spin() {
  spinAngleStart = angleToBeSpun / 32.807503994186335 //31.907503994186335 degrees per number;
  spinTime = 0;
  spinTimeTotal = 2 * 3 + 4 * 1000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }

  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);

  var degrees = spinAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);

  startAngle += (spinAngle * Math.PI / 180);
  drawSpinnerWheel();
  spinTimeout = setTimeout('rotateWheel()', 10);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  ctx.font = 'bold 30px Helvetica, Arial';
  var text = prize_descriptions[index];
  ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  ctx.restore();
}

function easeOut(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

drawSpinnerWheel();

function clicked() {
  spin();
}
