import '../WebGL/effect-composer.index';
import wireMail from './wireframe-mail';

export default (canvas) => {

  //check WebGL support
  // if (!supportsWebGL()) {
  //  alert("Your browser doesn\'t seem to support WebGL.");
  // }
  // 
  
  /* Three.js rendering */

  let rtParameters = {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.LinearMipMapLinearFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: true
  };
  
  let renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true} );
  renderer.setSize( canvas.width, canvas.height );
  renderer.setClearColor( 0xff0000, 0 );
  renderer.autoClear = false;

  // 3D object rendering
  let camera = new THREE.OrthographicCamera( canvas.width / - 2, canvas.width / 2, canvas.height / 2, canvas.height / - 2, - 500, 1000 );
  let scene3D = new THREE.Scene();

  /* Add a sphere */
  renderer.addGLSphere = (size, segments, x, y) => {
    let geometry = new THREE.SphereGeometry( size, segments, segments );
    let material = new THREE.MeshBasicMaterial({
          color : 0x75ff74,
          wireframe : true,
          wireframeLinewidth: 2
        });
    let sphere = new THREE.Mesh( geometry, material );
    sphere.position.x = x;
    sphere.position.y = y;
    scene3D.add( sphere );

    sphere.animation = () => {};

    return sphere;
  }

  /* Add a wireframe Mail */

  renderer.addGLMail = (x,y) => {
    let mail = wireMail;
    mail.position.x = x;
    mail.position.y = y;
    mail.animation = () => {};
    scene3D.add( mail );
    return mail;
  }

  /* clears all 3D objects */
  renderer.clearGLObjects = () => {
    scene3D.children.forEach(function(object){
      scene3D.remove(object);
    });
  }

  /***************************/
  
  let delta = 0.01;
  
  /* EffectComposer for postprocessing */
  let composer = new THREE.EffectComposer( renderer, 
    new THREE.WebGLRenderTarget(
      canvas.width, canvas.height, rtParameters));

  let composerScene = new THREE.EffectComposer( renderer, 
    new THREE.WebGLRenderTarget( 
      canvas.width, canvas.height, rtParameters ) );

  /* Clear Color pass */
  // let clearPass = new THREE.ClearPass( 'green', 1 );
  // // clearPass.renderToScreen = true;
  // composer.addPass( clearPass );

  /* TexturePass for the rot.js canvas */
  let texture = new THREE.Texture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.LinearMipMapLinearFilter;

  let texturePass = new THREE.TexturePass(texture);
  texturePass.opacity = 1;
  texturePass.clear = true;
  composerScene.addPass( texturePass );

  /* RenderPass for Objects in scene3D */
  let renderPass = new THREE.RenderPass( scene3D, camera);
  renderPass.clear = false;
  composerScene.addPass( renderPass );
  
  let renderScene = new THREE.TexturePass( composerScene.renderTarget2.texture );
  composer.addPass(renderScene);

  /*** Postprocessing Effects ***/

  /* Bloom Effect Pass */
  let effectBloom = new THREE.BloomPass(0.5);
  effectBloom.clear = false;
  composer.addPass( effectBloom );
  
  /* Glitch Shader Pass */
  let glitchPass = new THREE.GlitchPass();
  composer.addPass( glitchPass );

  /* Film and Tanline FX */
  let effectFilmBW = new THREE.FilmPass( 0.65, 0.2, 1024, false );
  composer.addPass( effectFilmBW );

  /* Vignette Shader */
  let shaderVignette = THREE.VignetteShader;
  let effectVignette = new THREE.ShaderPass( shaderVignette );
  effectVignette.uniforms[ "offset" ].value = 0.95;
  effectVignette.uniforms[ "darkness" ].value = 1.3;
  composer.addPass( effectVignette );

  let effectCopy = new THREE.ShaderPass(THREE.CopyShader);
  effectCopy.renderToScreen = true;
  composer.addPass(effectCopy);

  /* Render Function */
  (function render() {
    texture.needsUpdate = true;
    requestAnimationFrame( render );
    composerScene.render( delta );
    composer.render( delta );

    /* 3D object animation */
    animate();

  })();

  /* animates all 3D objects */
  function animate() {
    scene3D.children.forEach(function(object){
      object.animation();
    });
  }

  return renderer;
}