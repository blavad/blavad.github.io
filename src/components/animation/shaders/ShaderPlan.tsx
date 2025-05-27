// App.jsx
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function ShaderPlane() {
    const meshRef = useRef();
    const mouse = useRef([0, 0]);

    const { size } = useThree();

    const uniforms = useRef({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
    });

    // Mouse move event
    const handleMouseMove = (e) => {
        uniforms.current.uMouse.value.x = e.clientX / size.width;
        uniforms.current.uMouse.value.y = 1.0 - e.clientY / size.height;
    };

    useFrame((state, delta) => {
        uniforms.current.uTime.value += delta;
    });

    return (
        <mesh ref={meshRef} onPointerMove={handleMouseMove}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                uniforms={uniforms.current}
                fragmentShader={`
          uniform vec2 uMouse;
          uniform float uTime;
          uniform vec2 uResolution;

          void main() {
            vec2 uv = gl_FragCoord.xy / uResolution;
            float dist = distance(uv, uMouse);
            float color = 0.1 / dist;
            gl_FragColor = vec4(vec3(color), 1.0);
          }
        `}
            />
        </mesh>
    );
}
