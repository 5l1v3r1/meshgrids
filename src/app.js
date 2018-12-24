class App {
  constructor() {
    this.view = new PhysicsView(document.getElementById('canvas'));

    const p1 = new Particle(100, 100);
    const p2 = new Particle(200, 100);
    p2.velX = 50;
    new Spring(p1, p2);
    this.view.setPoints([p1, p2]);

    setInterval(() => {
      const elapsed = 1 / 24;
      this.view.points.forEach((p) => p.applyForces(elapsed));
      this.view.points.forEach((p) => p.applyVelocities(elapsed));
      this.view.draw();
    }, 1000 / 24);
  }
}