class PhysicsView {
  constructor(canvas) {
    this.canvas = canvas;
    this.points = [];
    this.springs = [];
    this.pressedPoint = null;
    this.pressedLoc = [0, 0];
    this.setupMouseEvents();
    this.setupResizeEvents();
  }

  setPoints(points) {
    this.points = points;
    this.springs = [];
    points.forEach((p) => {
      p.springs.forEach((s) => {
        if (p === s.p1) {
          this.springs.push(s);
        }
      });
    });
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    if (this.pressedPoint) {
      this.pressedPoint.x = this.pressedLoc[0];
      this.pressedPoint.y = this.pressedLoc[1];
    }
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = 'black';
    ctx.strokeStyle = '#999';
    this.springs.forEach((s) => {
      ctx.beginPath();
      ctx.moveTo(s.p1.x, s.p1.y);
      ctx.lineTo(s.p2.x, s.p2.y);
      ctx.stroke();
    });
    // this.points.forEach((p) => {
    //   ctx.beginPath();
    //   ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    //   ctx.fill();
    // });
  }

  setupMouseEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      let closest = null;
      let closestDist = 1000000;
      this.points.forEach((p) => {
        const dist = p.distance(new Particle(x, y));
        if (dist < closestDist) {
          closest = p;
          closestDist = dist;
        }
      });
      this.pressedPoint = closest;
      this.pressedLoc = [x, y];
    });
    this.canvas.addEventListener('mousemove', (e) => {
      this.pressedLoc = [e.clientX, e.clientY];
    });
    this.canvas.addEventListener('mouseup', (e) => {
      this.pressedPoint = null;
    });
  }

  setupResizeEvents() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}