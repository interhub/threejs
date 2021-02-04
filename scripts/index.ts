import * as THREE from 'three';
const OrbitControls = require('three-orbitcontrols')
import * as dat from 'dat.gui'

const WIDTH = innerWidth
const HEIGHT = innerHeight

function main() {
	const canvas = document.querySelector('canvas');


	const renderer = new THREE.WebGLRenderer({ canvas });
	renderer.shadowMap.enabled = true;
	const fov = 45;
	const aspect = 2;  // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 10, 20);

	const controls = new OrbitControls(camera, canvas);
	controls.target.set(0, 5, 0);
	controls.update();

	const scene = new THREE.Scene();
	scene.background = new THREE.Color('black');

	{
		const planeSize = 30;

		const loader = new THREE.TextureLoader();
		const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		const repeats = planeSize / 2;
		texture.repeat.set(repeats, repeats);

		const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
		const planeMat = new THREE.MeshPhongMaterial({
			map: texture,
			side: THREE.DoubleSide,
		});
		const mesh = new THREE.Mesh(planeGeo, planeMat);
		mesh.receiveShadow = true;
		mesh.rotation.x = Math.PI * -.5;
		scene.add(mesh);
	}
	{
		const cubeSize = 4;
		const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
		const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
		const mesh = new THREE.Mesh(cubeGeo, cubeMat);
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
		scene.add(mesh);
	}
	// VECTORS ARROW HELPERS
	{
		const dir = new THREE.Vector3(1, 0, 0);
		// dir.normalize();
		const origin = new THREE.Vector3(0, 0, 0);
		const vectors = [
			new THREE.Vector3(1, 0, 0),
			new THREE.Vector3(0, 1, 0),
			new THREE.Vector3(0, 0, 1),

			new THREE.Vector3(-1, 0, 0),
			new THREE.Vector3(0, -1, 0),
			new THREE.Vector3(0, 0, -1),

		]
		const length = 20;
		const hex = 0xffff00;
		vectors.forEach((vec) => {
			const arrowHelper = new THREE.ArrowHelper(vec, origin, length, hex);
			scene.add(arrowHelper);
		})

	}
	{
		const sphereRadius = 3;
		const sphereWidthDivisions = 32;
		const sphereHeightDivisions = 16;
		const sphereGeo = new THREE.SphereBufferGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
		const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
		const mesh = new THREE.Mesh(sphereGeo, sphereMat);
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
		scene.add(mesh);
	}

	class ColorGUIHelper {
		object: any;
		prop: any;
		constructor(object: any, prop: any) {
			this.object = object;
			this.prop = prop;
		}
		get value() {
			return `#${this.object[this.prop].getHexString()}`;
		}
		set value(hexString) {
			this.object[this.prop].set(hexString);
		}
	}

	function makeXYZGUI(gui: any, vector3: any, name: any, onChangeFn: any) {
		const CHANGE_SIZE = 30
		const folder = gui.addFolder(name);
		folder.add(vector3, 'x', -CHANGE_SIZE, CHANGE_SIZE).onChange(onChangeFn);
		folder.add(vector3, 'y', 0, CHANGE_SIZE).onChange(onChangeFn);
		folder.add(vector3, 'z', -CHANGE_SIZE, CHANGE_SIZE).onChange(onChangeFn);
		folder.open();
	}

	{
		const color = 0xFFFFFF;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.castShadow = true;
		light.position.set(0, 50, 10);
		light.target.position.set(-1, 0, -1);
		scene.add(light);
		scene.add(light.target);

		//ADD CAMERA HELPER
		const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
		scene.add(cameraHelper);
		// light.shadow.camera = 1

		const helper = new THREE.DirectionalLightHelper(light);
		scene.add(helper);

		const onChange = () => {
			light.target.updateMatrixWorld();
			helper.update();
		};
		onChange();

		const gui = new dat.GUI({ name: 'My GUI' });;
		gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
		gui.add(light, 'intensity', 0, 2, 0.01);

		makeXYZGUI(gui, light.position, 'position', onChange);
		makeXYZGUI(gui, light.target.position, 'target', onChange);
	}

	function resizeRendererToDisplaySize(renderer: any) {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			renderer.setSize(width, height, false);
		}
		return needResize;
	}

	function render() {

		resizeRendererToDisplaySize(renderer);

		{
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		renderer.render(scene, camera);

		requestAnimationFrame(render);
	}

	requestAnimationFrame(render);
}

main();
