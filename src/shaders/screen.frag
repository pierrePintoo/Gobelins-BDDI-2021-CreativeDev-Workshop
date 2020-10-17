precision highp float;

uniform float time;
uniform vec2 mouse;
uniform vec2 rez;

varying vec2 vUv;

void main() {

   float pct = 0.0;
   vec2 uv = vUv - .5;
   vec2 cursor = vec2(mouse.x, -mouse.y) / 2.;

   // The DISTANCE from the pixel to the mouse
   pct = distance( uv, cursor);
   // Convert to linear
   float disc = smoothstep( 0., 1., pct);
  
   vec3 color = vec3(disc);
   gl_FragColor = vec4( color, 1.0 );

   }
