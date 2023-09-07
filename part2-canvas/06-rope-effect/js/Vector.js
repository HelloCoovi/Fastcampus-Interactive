export default class Vector {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y)
  }
  static sub(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y)
  }

  add(x, y) {
    if (arguments.length === 1) {
      this.x += x.x
      this.y += x.y
    } else if (arguments.length === 2) {
      this.x += x
      this.y += y
    }
    return this
  }
  sub(x, y) {
    if (arguments.length === 1) {
      this.x -= x.x
      this.y -= x.y
    } else if (arguments.length === 2) {
      this.x -= x
      this.y -= y
    }
    return this
  }
  mult(v) {
    if (typeof v === "number") {
      this.x *= v
      this.y *= v
    } else {
      this.x *= v.x
      this.y *= v.y
    }
    return this
  }
  setXY(x, y) {
    this.x = x
    this.y = y
    return this
  }
  dist(v) {
    const dx = this.x - v.x
    const dy = this.y - v.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}