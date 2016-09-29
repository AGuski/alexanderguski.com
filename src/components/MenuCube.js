import React from 'react';

import { WebGLCanvas } from '../WebGL/WebGLCanvas';
import { WireObject } from '../WebGL/WireObject';
import { AutoRotator } from '../WebGL/AutoRotator';

import { moveElement } from '../utils/move-element';

/* vertices & connections for cube */

const cubeSize = {
  x: 240,
  y: 240,
  z: 240
};

const vertices = [
  new THREE.Vector3( -cubeSize.x/2,  cubeSize.y/2,  cubeSize.z/2),
  new THREE.Vector3(  cubeSize.x/2,  cubeSize.y/2,  cubeSize.z/2),
  new THREE.Vector3(  cubeSize.x/2, -cubeSize.y/2,  cubeSize.z/2),
  new THREE.Vector3( -cubeSize.x/2, -cubeSize.y/2,  cubeSize.z/2),
  new THREE.Vector3( -cubeSize.x/2,  cubeSize.y/2,  -cubeSize.z/2),
  new THREE.Vector3(  cubeSize.x/2,  cubeSize.y/2,  -cubeSize.z/2),
  new THREE.Vector3(  cubeSize.x/2, -cubeSize.y/2,  -cubeSize.z/2),
  new THREE.Vector3( -cubeSize.x/2, -cubeSize.y/2,  -cubeSize.z/2)
];

const connections = [
  [0,1],[1,2],[2,3],[3,0],
  [4,5],[5,6],[6,7],[7,4],
  [0,4],[1,5],[2,6],[3,7]
];

class MenuCube extends React.Component {
  constructor() {
    super();

    this.menuItems;
    this.cube = new WireObject(vertices, connections, '#6d6d6d');

    // the mighty autoRotator
    this.autoRotator = new AutoRotator(this.cube);
  }

  render() {
    return (
      <div id="cube-canvas" 
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseDown={this.onMouseDown.bind(this)}
        onTouchStart={this.onTouchStart.bind(this)}
        >
          <a className="cube-menu-item" >work</a>
          <a className="cube-menu-item" >music/audio</a>
          <a className="cube-menu-item" >contact</a>
          <a className="cube-menu-item" >more stuff</a>
			</div>
    );
  }

  componentDidMount() {

    let points;

    let cube = this.cube;

    cube.rotating = true;

    let cubeCanvas = new WebGLCanvas($('#cube-canvas'));    

    let pointMaterial = new THREE.PointsMaterial( {color: '#ffffff', size: 0, sizeAttenuation: false} )
    let pointGeometry = new THREE.Geometry();
    pointGeometry.vertices.push(
      new THREE.Vector3(0,0, 140),
      new THREE.Vector3(0,0, -140),
      new THREE.Vector3(140, 0, 0),
      new THREE.Vector3(-140,0,0)
    )

    points = new THREE.Points(pointGeometry, pointMaterial);

    // cube-menu-item Anchor Points
    points.linkAnchorPoint = function(element, id) {
      let vectorPos = points.geometry.vertices[id].clone();
      vectorPos.applyMatrix4( this.matrixWorld );
      let projection = vectorPos.project(cubeCanvas.camera);
      let left = (projection.x+1)*(cubeCanvas.getWidth()/2)-5;
      let top = (-projection.y+1)*(cubeCanvas.getHeight()/2)-12;
      let z = (1-projection.z)*10+0.5;
      element.style.transform = `perspective(700px) translate3d(${left}px, ${top}px, 0px) scale(${z},${z})`;
    }

    cube.add(points);

    const CUBE_SCALE = 1;

    cube.scale.x = CUBE_SCALE;
    cube.scale.y = CUBE_SCALE;
    cube.scale.z = CUBE_SCALE;

    cubeCanvas.add( cube );

    cube.rotation.x = 0.3;

    // let textAreaEl = $('#text-area');

    // Text links
    this.menuItems = $('.cube-menu-item');

    this.menuItems[0].addEventListener('click', () => {
      this.changeContentState('WORK_CODE', {
        x: 0.3,
        y: 0.4,
        z: 0
      });
    });

    this.menuItems[1].addEventListener('click', () => {
      this.changeContentState('WORK_AUDIO', {
        x: 0.3, 
        y: Math.PI+0.4,
        z: 0
      });
    });

    this.menuItems[2].addEventListener('click', () => {
      this.changeContentState('CONTACT', {
        x: 0.3, 
        y: Math.PI+(Math.PI/2)+0.4,
        z: 0
      });
    });

    this.menuItems[3].addEventListener('click', () => {
      this.changeContentState('ABOUT', {
        x: 0.3, 
        y:Math.PI-(Math.PI/2)+0.4,
        z: 0
      });
    });

    /* custom animation for cubeCanvas */
    cubeCanvas.animation = () => {

      points.updateMatrixWorld();

      points.linkAnchorPoint(this.menuItems[0], 0);
      points.linkAnchorPoint(this.menuItems[1], 1);
      points.linkAnchorPoint(this.menuItems[2], 2);
      points.linkAnchorPoint(this.menuItems[3], 3);

      cube.renderTorque();
      this.autoRotator.rotate();

      // cube.rotation.x += 0.005;
      if (cube.rotating) {
        cube.rotation.y += 0.0075;
      }

      // keep rotation to max 2*PI
      cube.rotation.x = cube.rotation.x%(2*Math.PI);
      cube.rotation.y = cube.rotation.y%(2*Math.PI);
      cube.rotation.z = cube.rotation.z%(2*Math.PI);

      // keep rotation positive
      cube.rotation.x = cube.rotation.x>=0 ? cube.rotation.x : 2*Math.PI+cube.rotation.x;
      cube.rotation.y = cube.rotation.y>=0 ? cube.rotation.y : 2*Math.PI+cube.rotation.y;
      cube.rotation.z = cube.rotation.z>=0 ? cube.rotation.z : 2*Math.PI+cube.rotation.z;
    }

    // manual key rotation 

    window.addEventListener('keydown', (event) => {
      this.autoRotator.stop();
      switch (event.code) {
        case 'ArrowLeft':
          cube.rotation.y += -0.08;
          break;
        case 'ArrowRight':
          cube.rotation.y += 0.08;
          break;
        case 'ArrowUp':
          cube.rotation.x += -0.08;
          break;
        case 'ArrowDown':
          cube.rotation.x += 0.08;
          break;
        case 'KeyL':
          
          break;
        default:
          console.log(event);
          break;
      }
    });
  }

  changeContentState(stateName, rotatePosition) {
    this.cube.rotating = false;
    let timing = this.props.contentState != 'LANDING' ? 0 : 1.5;
    this.autoRotator.rotateTo(rotatePosition, () => {
      moveElement(this, timing, 120, 180, (element) => {
        $(element).css({
          position: 'absolute',
          top: element.offsetTop,
          left: element.offsetLeft
        });
        this.props.setContentState(stateName);
      });
      
    });
  }

  // mouse & touch controls

  onMouseEnter() {
    TweenMax.to(this.menuItems, 1.5, {
        opacity: 1,
        ease: Power2.easeIn
    });
  }

  onMouseDown(event) {
    event.preventDefault();

    let onMouseMoveBound = onDocumentMouseMove.bind(this);
    let onMouseUpBound = onDocumentMouseUp.bind(this);

    document.addEventListener( 'mousemove', onMouseMoveBound, false );
    document.addEventListener( 'mouseup', onMouseUpBound, false );

    function onDocumentMouseMove(event) {
      this.cube.torque.y = (event.movementX/ 200)*Math.cos(this.cube.rotation.x);
      // this.cube.torque.z = (event.movementX/ 200)*-Math.sin(this.cube.rotation.x);
      this.cube.torque.x = event.movementY/ 200;
    }

    function onDocumentMouseUp() {
      document.removeEventListener( 'mousemove', onMouseMoveBound, false );
      document.removeEventListener( 'mouseup', onMouseUpBound, false );
    }
  }

  onTouchStart(event) {
    TweenMax.to(this.menuItems, 1.5, {
        opacity: 1,
        ease: Power2.easeIn
    });
    let mouseX = event.touches[ 0 ].pageX;
    let mouseY = event.touches[ 0 ].pageY;

    let onTouchMoveBound = onDocumentTouchMove.bind(this);
    let onTouchEndBound = onDocumentTouchEnd.bind(this);

    document.addEventListener( 'touchmove', onTouchMoveBound, false );
    document.addEventListener( 'touchend', onTouchEndBound, false);

    function onDocumentTouchMove(event) {
      if ( event.touches.length === 1 ) {
        event.preventDefault();
        let cube = this.cube;
        let prevMouseX = mouseX;
        let prevMouseY = mouseY;

        mouseX = event.touches[ 0 ].pageX;
        mouseY = event.touches[ 0 ].pageY;

        cube.torque.y = (Math.floor(mouseX - prevMouseX) / 150)*Math.cos(cube.rotation.x);
        if (Math.abs(cube.torque.y) <= 0.01) {
          cube.torque.y = 0;
        }
        cube.torque.x = Math.floor(mouseY - prevMouseY) / 150;
        if (Math.abs(cube.torque.x) <= 0.01) {
          cube.torque.x = 0;
        }
      }
    }

    function onDocumentTouchEnd() {
      document.removeEventListener( 'touchmove', onTouchMoveBound, false );
      document.removeEventListener( 'touchend', onTouchEndBound, false );
    }
  }

}

export default MenuCube;