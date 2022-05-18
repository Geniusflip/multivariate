varying vec2 vUv;
varying vec4 modelViewPosition; 
varying vec3 fragmentNormal; 

void main() {
    
    fragmentNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz;

	vec2 p = 1.41 * vec2(0.6, 1.0);
    
    vUv = uv;

    gl_Position = projectionMatrix  * modelViewMatrix  * vec4( position, 1.0 );
}