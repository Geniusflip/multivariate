
varying vec2 vUv;
varying vec4 modelViewPosition; 
varying vec3 fragmentNormal; 
uniform float time;
uniform float seed;
uniform float multiplier;

vec3 hash( vec2 p )
{
    vec3 q = vec3(
        1.0,
        1.0,
        dot(p,vec2(419.2 + seed ,371.9))
    );
	return fract(tan(q) * 43758.5453);
}

// voronoise implemntation
float noise( in vec2 p, float u, float v )
{
	float k = 1.0 + 63.0 * pow(1.0 - v, 6.0);

    vec2 i = floor(p);
    vec2 f = fract(p);
    
	vec2 a = vec2(0.0,0.0);

    for( int y=-2; y<=2; y++ )
    for( int x=-2; x<=2; x++ )
    {
        vec2 g = vec2( x, y );
		vec3 o = hash( i + g ) * vec3(u,u,1.0);
		vec2 d = g - f + o.xy;
		float w = pow( 1.0 - smoothstep(0.0, 1.414, length(d)), k );
		a += vec2(o.z*w,w);
    }
	
    return a.x/a.y;
}

#define NUM_OCTAVES 5

float fbm( vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);

    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(3.0 * _st, 1.2, 0.9);
        _st = _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {

	vec2 uv = vUv * 3.0 + seed;
    vec3 color = vec3(0.0);

    vec2 q = vec2(0.0);
    q.x = fbm(uv + 0.0001 * time * multiplier );
    q.y = fbm(uv + 0.001 * time * multiplier);

    vec2 r = vec2(0.0);
    r.x = fbm( uv + q + vec2(0.1, 2.4));
    r.y = fbm( uv + 4.0 * q + vec2(1.7, 9.2)) ;

    float f = fbm(uv + r + q * 3.0);
    f = fbm(uv * f); 
    // f = fbm(uv * f); 
    
    color = mix(
        vec3(0.898, 0.9098, 0.898),
        vec3(0.4824, 0.4824, 0.1098) ,
        clamp((f*f)* 4.0, 0.0, 1.0)
    );
    color = mix(color,
        vec3(0.5373, 0.7529, 0.8902),
        clamp(length(q), 0.0, 1.0)
    );

    color = mix(color,
                vec3(0.5882, 0.8157, 0.8157),
                clamp(length(r.x),0.0,1.0));

	// vec4 color =  vec4(uv * , p.x, p.y);
	gl_FragColor = vec4(( f* f* f * f + 1.4 * f) * color, 1.0);
}