const canvas = document.querySelector("canvas");

// canvas.height = 400;
// canvas.width = 400;

const context = canvas.getContext("2d");

// context.fillRect(0, 0, 100, 100);
// context.fillRect(0, 200, 100, 100);
// context.fillRect(200, 0, 100, 100);
// context.fillRect(100, 100, 100, 100);
// context.fillRect(300, 100, 100, 100);
// context.fillRect(200, 200, 100, 100);
// context.fillRect(100, 300, 100, 100);
// context.fillRect(300, 300, 100, 100);

// context.beginPath();
// context.moveTo(500, 400);
// context.lineTo(600, 300);
// context.lineTo(700, 400);
// context.lineTo(800, 300);
// context.lineTo(900, 400);
// context.stroke();

const randomColor = () => {
  let color = "#";
  const char = "0123456789ABCDEF";

  for (let i = 0; i < 6; i++) {
    color += char[Math.floor(Math.random() * 16)];
  }

  return color;
};

// for (let i = 0; i < 100; i++) {
//   const x = Math.random() * window.innerWidth;
//   const y = Math.random() * window.innerHeight;
//   context.beginPath();
//   context.arc(x, y, 50, 0, Math.PI * 2, false);
//   context.strokeStyle = randomColor();
//   context.stroke();
// }

const mousePostion = {
  x: 0,
  y: 0,
};

class Circle {
  color = randomColor();
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
  }
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
    context.strokeStyle = this.color;
    context.stroke();
  }
  update() {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (
      mousePostion.x - this.x < 50 &&
      mousePostion.x - this.x > -50 &&
      mousePostion.y - this.y < 50 &&
      mousePostion.y - this.y > -50
    ) {
      if (this.radius < 40) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius = 2;
    }

    this.draw();
  }
}

let circleArray = [];

function init() {
  circleArray = [];

  console.log("jdghj");

  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * window.innerWidth - 1;

    const y = Math.random() * window.innerHeight;
    const dx = Math.random() * 1;
    const dy = Math.random() * 1;
    const radius = Math.random() * 3 + 1;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();

window.addEventListener("mousemove", (e) => {
  mousePostion.x = e.x;
  mousePostion.y = e.y;
});

window.addEventListener("resize", (e) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

window.addEventListener("load", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
