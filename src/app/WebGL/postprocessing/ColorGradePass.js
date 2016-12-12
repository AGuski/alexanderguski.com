/**
 * @author aguski https://github.com/AGuski
 */

THREE.ColorGradePass = function () {

	THREE.Pass.call( this );

  if ( THREE.ColorGradeShader === undefined )
		console.error( "THREE.ColorGradePass relies on THREE.ColorGradeShader" );

	var shader = THREE.ColorGradeShader;

	this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	this.material = new THREE.ShaderMaterial( {
		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader

	} );

	this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
	this.scene  = new THREE.Scene();

	this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null );
	this.scene.add( this.quad );

};

THREE.ColorGradePass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {

	constructor: THREE.ColorGradePass,

	render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {

    this.uniforms[ "time" ].value += delta;

		this.quad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.render( this.scene, this.camera );

		} else {

			renderer.render( this.scene, this.camera, writeBuffer, this.clear );

		}

	}

} );
