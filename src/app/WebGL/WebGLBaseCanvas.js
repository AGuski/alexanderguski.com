/**
 *  TODO: should be the original WebGLCanvas, and the current complex one needs to inherit or decorate.
 * 
 */


export class WebGLBaseCanvas {
  constructor(element) {
    /* get canvas information */
    this.element = element;
    this.canvasWidth = element.width();
    this.canvasHeight = element.height();

    /* setup WebGL renderer */
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.renderer.setSize( this.canvasWidth, this.canvasHeight );
    this.renderer.setPixelRatio( window.devicePixelRatio );

    /* append renderer to canvas */
    element.get(0).appendChild( this.renderer.domElement );

    /* create scene */
    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

    this.clock = new THREE.Clock()

    this.resize = this.resize.bind(this);
    window.addEventListener( 'resize', this.resize, false );

    this.render = this.render.bind(this);
    this.render();
  }

  /* render loop */
  render() {
    this.delta = this.clock.getDelta();
    requestAnimationFrame( this.render );
    this.animate();
    // this.composer.render( this.delta );
    this.renderer.render( this.scene, this.camera );
  }

  resize() {
    this.camera.aspect = this.canvasWidth / this.canvasHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.canvasWidth, this.canvasHeight );
  }

  animate() {}
}
