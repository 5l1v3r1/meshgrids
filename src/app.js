const NUM_SPRINGS = 20;

class App {
  constructor() {
    this.view = new PhysicsView(document.getElementById('canvas'));

    const points = [];
    for (let x = 100; x < 500; x += 20) {
      for (let y = 100; y < 500; y += 20) {
        const p = new Particle(x, y);
        points.push(p);
      }
    }
    points.forEach((p1, i) => {
      points.slice(i + 1).forEach((p2) => {
        if (p1.distance(p2) < 100) {
          new Spring(p1, p2, 900 / Math.pow(p1.distance(p2), 2));
        }
      })
    });
    this.view.setPoints(points);

    setInterval(() => {
      const elapsed = 1 / (4 * 24);
      for (let i = 0; i < 4; ++i) {
        this.view.points.forEach((p) => p.applyForces(elapsed));
        this.view.points.forEach((p) => p.applyVelocities(elapsed));
      }
      this.view.draw();
    }, 1000 / 24);
  }
}