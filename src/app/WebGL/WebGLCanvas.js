export class WebGLCanvas {
  constructor(element) {
    /* get canvas information */
    this.element = element;
    this.canvasWidth = element.width();
    this.canvasHeight = element.height();

    // console.log(this.canvasHeight);

    /* setup WebGL renderer */
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.renderer.setSize( this.canvasWidth, this.canvasHeight );

    /* append renderer to canvas */
    element.get(0).appendChild( this.renderer.domElement );

    /* create scene */
    this.scene = new THREE.Scene();

    /* initialize camera */
    this.camera = new THREE.PerspectiveCamera( 50, this.canvasWidth / this.canvasHeight, 10, 10000 );

    this.camera.position.z= 500;

    /* object selection */
    this.objects = [];
    this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();

    element[0].addEventListener('mousedown', this.onMouseDown.bind(this), false);

    
    /* render loop */
    let render = () => {
      requestAnimationFrame( render );
      this.animation();
      this.renderer.render( this.scene, this.camera );
    }
    render();

    window.addEventListener( 'resize', () => {
      this.camera.aspect = this.canvasWidth / this.canvasHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize( this.canvasWidth, this.canvasHeight );

    }, false );
  }

  /* add object to this canvas scene */
  add(object) {
    this.scene.add(object);
    object.children.forEach((child) => {
      this.objects.push (child);
    });
    
  }

  /* to be overriden with custom animation */
  animation() {}

  onMouseDown(event) {
    event.preventDefault();
    this.mouse.x = ( event.offsetX / this.renderer.domElement.clientWidth ) * 2 - 1;
    this.mouse.y = - ( event.offsetY / this.renderer.domElement.clientHeight ) * 2 + 1;
    this.raycaster.setFromCamera( this.mouse, this.camera );
    var intersects = this.raycaster.intersectObjects( this.objects );

    if ( intersects.length > 0 ) {
      intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
    }
  }

  /* getters */

  getElement() {
    return this.element;
  }

  getWidth() {
    return this.canvasWidth;
  }

  getHeight() {
    return this.canvasHeight;
  }
}