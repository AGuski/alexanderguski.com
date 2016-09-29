/**
 * Auto rotator class to rotate WebGL 3D objects to target positions. (x & y for now)
 */

export class AutoRotator {
  constructor(object) {
    this.object = object;
    this.run = false;
    this.inTargetPos = {x: true, y: true, z: true};
    this.target = {x: 0, y: 0, z: 0};
    this.startDiff = {x: 0, y: 0, z: 0};
    this.rotateDir = {x: 1, y: 1, z: 1};
    this.snapDistance = 0.01; // <-- When to snap to target position.
  }

  rotateTo(target, callback) {
    this.callback = callback;
    // remove any torque
    this.object.removeTorque();

    this.target = { x: target.x, y: target.y, z: target.z };
    this.startDiff = this.getDiff();
    this.rotateDir = {
      x: (this.target.x + Math.PI)%(2*Math.PI) <= this.object.rotation.x ? 1 : -1,
      y: (this.target.y + Math.PI)%(2*Math.PI) <= this.object.rotation.y ? 1 : -1,
      z: (this.target.z + Math.PI)%(2*Math.PI) <= this.object.rotation.z ? 1 : -1
    }
    this.inTargetPos = {x: false, y: false, z: false};
    this.run = true;
  }

  rotate() {
    let rDir = this.rotateDir;
    let diff = this.getDiff();

    if (this.run) {
      for (let axis in this.target) {
        if (this.getDiff()[axis] < this.snapDistance) {
          this.object.rotation[axis] = this.target[axis];
          this.inTargetPos[axis] = true;
        } else {
          this.object.rotation[axis] += this.easing(0.13, diff[axis])*rDir[axis];
        }
      }
      // If all axis are in target position stop
      if (this.inTargetPos.x && this.inTargetPos.y && this.inTargetPos.z) {
        this.stop();
        if(this.callback){
          this.callback();
        }
      }
    }
  }

  easing(speed, coeff) {
    return coeff > 1 ? speed : speed*coeff;
  }

  stop() {
    this.run = false;
  }

  getDiff() {
    return {
      x: Math.abs(this.object.rotation.x - this.target.x),
      y: Math.abs(this.object.rotation.y - this.target.y),
      z: Math.abs(this.object.rotation.z - this.target.z),
    }
  }
}