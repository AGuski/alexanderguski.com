import { WireObject } from './../WebGL/WireObject';

const cubeSize = {
  x: 120,
  y: 75,
  z: 7
};

const vertices = [
  new THREE.Vector3( -cubeSize.x/2,  cubeSize.y/2,  cubeSize.z/2),
  new THREE.Vector3(  cubeSize.x/2,  cubeSize.y/2,  cubeSize.z/2),
  new THREE.Vector3(  cubeSize.x/2, -cubeSize.y/2,  cubeSize.z/2),
  new THREE.Vector3( -cubeSize.x/2, -cubeSize.y/2,  cubeSize.z/2),
  new THREE.Vector3( -cubeSize.x/2,  cubeSize.y/2,  -cubeSize.z/2),
  new THREE.Vector3(  cubeSize.x/2,  cubeSize.y/2,  -cubeSize.z/2),
  new THREE.Vector3(  cubeSize.x/2, -cubeSize.y/2,  -cubeSize.z/2),
  new THREE.Vector3( -cubeSize.x/2, -cubeSize.y/2,  -cubeSize.z/2),

  new THREE.Vector3( 0, -cubeSize.y/7, cubeSize.z/2),
  new THREE.Vector3( cubeSize.x/10, 0, cubeSize.z/2),
  new THREE.Vector3( -cubeSize.x/10, 0, cubeSize.z/2)
];

const connections = [
  [0,1],[1,2],[2,3],[3,0],
  [4,5],[5,6],[6,7],[7,4],
  [0,4],[1,5],[2,6],[3,7],

  [0,8],[1,8],

  [2,9],[3,10]
];

export default new WireObject(vertices, connections, '#75ff74');