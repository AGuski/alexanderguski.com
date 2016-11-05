export class WireObject extends THREE.Object3D {
  
  constructor(vertices, connections, color) {
    super();
    this.vertices = vertices;
    this.connections = connections;
    this.color = color;
    this.torque = {x: 0, y: 0, z: 0};
    this.friction = 0.0125;

    this.material = new THREE.LineBasicMaterial({
      color: this.color
    });

    for (let i = 0; i < connections.length; i++) {
      let geometry = new THREE.Geometry();
      geometry.vertices.push(
        vertices[connections[i][0]],
        vertices[connections[i][1]]
      );
      let line = new THREE.LineSegments( geometry, this.material );
      this.add( line );
    }

    // only cube for now
    var geometry = new THREE.BoxGeometry( 240, 240, 240 );
    var material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: false,
      opacity: 0.0
    });
    material.transparent = true;
    var cube2 = new THREE.Mesh( geometry, material );
    this.add(cube2);


  }

  addTorque(object) {
    for (let axis in this.torque) {
      if (object[axis]) {
        this.torque[axis] += object[axis];
      }
    }
  }

  removeTorque() {
    this.torque = { x: 0, y: 0, z: 0 };
  }

  renderTorque() {
    for (let axis in this.torque) {
      this.rotation[axis] += this.torque[axis];
      this.torque[axis] = this.torque[axis]*(1-(this.friction));
    }
  }
}