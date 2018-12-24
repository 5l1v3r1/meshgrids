class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velX = 0;
    this.velY = 0;
    this.springs = [];
  }

  applyForces(t) {
    this.springs.forEach((s) => {
      [fx, fy] = s.forceOn(this);
      this.velX += t * fx;
      this.velY += t * fy;
    });
  }

  distance(p2) {
    return Math.sqrt(Math.pow(p2.x - this.x, 2) + Math.pow(p2.y - this.y, 2));
  }
}

class Spring {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.restLength = p1.distance(p2);
    this.hookeConstant = 1;
  }
}