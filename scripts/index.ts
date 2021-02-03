import * as THREE from "three";
// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// const getSize = () => ({
// 	width: window.innerWidth,
// 	height: window.innerHeight,
// })
// const renderer = new THREE.WebGLRenderer({alpha: true})
// renderer.setSize(getSize().width, getSize().height)
// document.body.appendChild(renderer.domElement)

// const geometry = new THREE.BoxGeometry()

// const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)
// camera.position.z = 5

// renderer.setClearColor('#4649ab', 0.9)

// // const toggleMenu = (() => {
// // 	const menu = `
// //     <div class="menu_box" id="" >
// //         // <div id="menu" >
// //         // </div>
// //     </div>`
// // 	document.body.innerHTML += menu
// // 	const menuNode = document.querySelector('.menu_box')
// // 	return () => {
// // 		console.log('call toggle')
// // 		menuNode.id = menuNode.id === 'menu_box' ? '' : 'menu_box'
// // 	}
// // })()

// let loader = new THREE.GLTFLoader()
// loader.load('models/cactus.gltf', function (gltf) {
// 	const car = gltf.scene.children[0]
// 	car.scale.set(0.5, 0.5, 0.5)
// 	scene.add(gltf.scene)
// })

// class Controller {
// 	constructor() {
// 		this.initializeEventHandlers()
// 	}

// 	stepSize = 0.1

// 	keys = {}

// 	startAnimate = (this.animate = () => {
// 		requestAnimationFrame(this.animate)
// 		renderer.render(scene, camera)
// 		Object.keys(this.keys).forEach((key) => {
// 			if (this.keys[key]) this.onChangeCheckedState(key)
// 		})
// 	})

// 	initializeEventHandlers() {
// 		window.onkeydown = (e) => {
// 			this.keys[e.key] = true
// 		}
// 		window.onkeyup = (e) => {
// 			this.keys[e.key] = false
// 		}
// 		window.onmousemove = (e) => {
// 			camera.rotation.x = (e.pageY - getSize().height / 2) / 1000
// 			camera.rotation.y = (e.pageX - getSize().width / 2) / 1000
// 		}
// 		window.onkeyup = (e) => {
// 			console.log(e.key)
// 			if (e.key === 'Escape') {
// 				// toggleMenu() //TODO toggle menu
// 			}
// 		}
// 	}
// 	onChangeCheckedState(key) {
// 		switch (key) {
// 			// 	return (camera.position.x += this.stepSize)
// 			// case 'd':
// 			// 	return (camera.position.x -= this.stepSize)
// 			case 'w':
// 				cube.position.z -= this.stepSize * 0.99
// 				return (camera.position.z -= this.stepSize)
// 			case 's':
// 				cube.position.z += this.stepSize * 0.99
// 				return (camera.position.z += this.stepSize)
// 			default:
// 				return
// 		}
// 	}
// }

// const controller = new Controller()

// controller.startAnimate()

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000)
var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
var plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
var ambientLight = new THREE.AmbientLight(0x0c0c0c)
scene.add(ambientLight)
var spotLight = new THREE.SpotLight(0xffffff)
scene.add(spotLight)

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(WIDTH, HEIGHT)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
camera.position.z = 10

const addCube = () => {
	return
	// var cubeSize = Math.ceil(Math.random() * 3)
	// var cubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize)
	// var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff})
	// var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
	// cube.castShadow = true
	// cube.name = 'cube-' + scene.children.length
	// cube.position.x = -30 + Math.round(Math.random() * planeGeometry.width)
	// cube.position.y = Math.round(Math.random() * 5)
	// cube.position.z = -20 + Math.round(Math.random() * planeGeometry.height)
	// scene.add(cube)
	// this.numberOfObjects = scene.children.length
}

// addCube()

const animate = () => {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}
animate()
