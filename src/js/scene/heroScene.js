import * as THREE from 'three';

const vertexShader = `
  attribute float aScale;
  attribute float aRandom;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    float scrollMorph = uScroll * 2.0;
    pos.y += sin(pos.x * 0.5 + uTime * 0.3 + aRandom * 6.28) * (0.3 + scrollMorph * 0.5);
    pos.x += cos(pos.y * 0.3 + uTime * 0.2 + aRandom * 6.28) * (0.2 + scrollMorph * 0.3);
    pos.z += sin(uTime * 0.15 + aRandom * 6.28) * 0.4;

    vec2 mouseInfluence = uMouse - pos.xy * 0.5;
    float dist = length(mouseInfluence);
    float repulsion = smoothstep(1.5, 0.0, dist) * 0.15;
    pos.xy += normalize(mouseInfluence + 0.001) * repulsion;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float sizeScale = aScale * (1.0 + scrollMorph * 0.5);
    gl_PointSize = sizeScale * uPixelRatio * (300.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 1.0, 8.0);

    vAlpha = 0.3 + aRandom * 0.5;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - 0.5);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export class HeroScene {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.reducedMotion = options.reducedMotion || false;
    this.isMobile = window.innerWidth < 768;
    this.particleCount = this.reducedMotion
      ? 0
      : this.isMobile
        ? 8000
        : 25000;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scroll = 0;
    this.isVisible = true;
    this.isReady = false;

    if (this.particleCount === 0) {
      this.isReady = true;
      return;
    }

    this._init();
    this._createParticles();
    this._bindEvents();
    this.isReady = true;
    this._animate();
  }

  _init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });

    const dpr = Math.min(window.devicePixelRatio, 1.5);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);

    this.clock = new THREE.Clock();
  }

  _createParticles() {
    const positions = new Float32Array(this.particleCount * 3);
    const scales = new Float32Array(this.particleCount);
    const randoms = new Float32Array(this.particleCount);

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 2;

      scales[i] = Math.random() * 2 + 0.5;
      randoms[i] = Math.random();
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
        uColor: { value: new THREE.Color('#6ee7ff') },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
  }

  _bindEvents() {
    this._onResize = () => {
      if (!this.renderer) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      this.renderer.setPixelRatio(dpr);
      this.renderer.setSize(w, h);
      if (this.material) {
        this.material.uniforms.uPixelRatio.value = dpr;
      }
    };

    this._onMouseMove = (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    this._onVisibility = () => {
      this.isVisible = !document.hidden;
    };

    window.addEventListener('resize', this._onResize);
    window.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('visibilitychange', this._onVisibility);
  }

  setScroll(progress) {
    this.scroll = progress;
  }

  _animate() {
    if (!this.renderer) return;

    this.rafId = requestAnimationFrame(() => this._animate());

    if (!this.isVisible || this.reducedMotion) return;

    const elapsed = this.clock.getElapsedTime();

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    this.material.uniforms.uTime.value = elapsed;
    this.material.uniforms.uScroll.value = this.scroll;
    this.material.uniforms.uMouse.value.set(this.mouse.x, this.mouse.y);

    this.points.rotation.y = elapsed * 0.02 + this.scroll * 0.3;
    this.points.rotation.x = Math.sin(elapsed * 0.1) * 0.1;

    this.renderer.render(this.scene, this.camera);
  }

  waitForReady() {
    return new Promise((resolve) => {
      if (this.isReady) {
        resolve();
        return;
      }
      const check = setInterval(() => {
        if (this.isReady) {
          clearInterval(check);
          resolve();
        }
      }, 50);
    });
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('visibilitychange', this._onVisibility);
    this.geometry?.dispose();
    this.material?.dispose();
    this.renderer?.dispose();
  }
}
