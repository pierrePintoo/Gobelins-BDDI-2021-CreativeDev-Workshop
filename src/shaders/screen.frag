precision highp float;

uniform float time;
uniform vec2 mouse;

// abs : renvoi la version absolue du chiffre pour que ce soit toujours supérieur à 0
varying vec2 vUv;

void main() {
    vec3 color1 = vec3(1, 0.101, 0.858);
    vec3 color2 = vec3(0.215, 0.101, 1);

    float mixValue = smoothstep(((mouse.x + 1.) / 2.) - .3, ((mouse.x + 1.) / 2.) + .3, vUv.x);

    vec3 finalColor = mix(color1, color2, mixValue);

    gl_FragColor = vec4(finalColor, 1.);
}