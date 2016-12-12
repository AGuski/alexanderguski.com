/**
 * @author aguski https://github.com/AGuski
 *
 * Colorgrade shader
 * 
 */

THREE.ColorGradeShader = {

	uniforms: {

    "time":     { value: 0.0 }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

    "uniform float time;",

		"varying vec2 vUv;",

		"void main() {",

      "vec2 position = vUv;",

      "float color1 = 0.5;",
      "float speed1 = 0.05;",
      "color1 = sin(position.x+cos(time*speed1));",

      "float color2 = 0.0;",

      "color2 = cos(position.x+sin(time*speed1));",

      "gl_FragColor = vec4( vec3( color1, color2, 1 ), 1.0 );",

		"}"

	].join( "\n" )

};
