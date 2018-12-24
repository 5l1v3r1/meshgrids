const VEL_DAMPING = 0.5;

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
      let [fx, fy] = s.forceOn(this);
      this.velX += t * fx;
      this.velY += t * fy;
    });
    this.velX *= Math.pow(VEL_DAMPING, t);
    this.velY *= Math.pow(VEL_DAMPING, t);
  }

  applyVelocities(t) {
    this.x += t * this.velX;
    this.y += t * this.velY;
  }

  distance(p2) {
    return Math.sqrt(Math.pow(p2.x - this.x, 2) + Math.pow(p2.y - this.y, 2));
  }
}

class Spring {
  constructor(p1, p2, k) {
    this.p1 = p1;
    this.p2 = p2;
    p1.springs.push(this);
    p2.springs.push(this);
    this.restLength = p1.distance(p2);
    this.k = k || 1;
  }

  forceOn(p) {
    const curLength = this.p1.distance(this.p2);
    const mag = (curLength - this.restLength) * this.k;
    const other = (p === this.p1 ? this.p2 : this.p1);
    return [mag * (other.x - p.x), mag * (other.y - p.y)];
  }
}