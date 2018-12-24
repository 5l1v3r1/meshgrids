class PhysicsView {
  constructor(canvas, points) {
    this.canvas = canvas;
    this.points = [];
    this.springs = [];
  }

  setPoints(points) {
    this.points = points;
    this.springs = [];
    points.forEach((p) => {
      p.springs.forEach((s) => {
        if (p === s.p1) {
          this.springs.append(s);
        }
      });
    });
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.strokeStyle = '#999';
    this.springs.forEach((s) => {
      ctx.beginPath();
      ctx.moveTo(s.p1.x, s.p1.y);
      ctx.lineTo(s.p2.x, s.p2.y);
      ctx.stroke();
    });
    this.points.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}