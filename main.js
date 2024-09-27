import * as THREE from 'three';
import  './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')});
renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

const pl = new THREE.PointLight(0xffffff)
pl.position.set(20,20,20)

const al = new THREE.AmbientLight(0xffffff)
scene.add(pl,al)

camera.position.setZ(30);

const gh = new THREE.GridHelper(200,50)
//scene.add(gh)


const ctrls = new OrbitControls(camera, renderer.domElement)

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24)
  const material = new THREE.MeshStandardMaterial({color:0xffffff})

  const star = new THREE.Mesh(geometry, material)
  
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200))

  star.position.set(x,y,z)
  scene.add(star)


}
addStar()


Array(400).fill().forEach(addStar);

//const sT = new THREE.TextureLoader().load('space.jpg')
//scene.background = sT

const yoghesh = new THREE.TextureLoader().load('chandra.jpg')

const ycube = new THREE.Mesh(new THREE.BoxGeometry(3,3,3), new THREE.MeshBasicMaterial({map:yoghesh}))
scene.add(ycube)

const moonT = new THREE.TextureLoader().load('moon.jpg')

const moon = new THREE.Mesh(new THREE.SphereGeometry(3,32,32), new THREE.MeshStandardMaterial({map:moonT}))
scene.add(moon)

moon.position.z = 30
moon.position.setX(-10)


function moveCam(){

  const t = document.body.getBoundingClientRect().top
  moon.rotation.x += 0.05
  moon.rotation.y += 0.075
  moon.rotation.z += 0.05

  ycube.rotation.z += 0.01
  ycube.rotation.y += 0.01

  torus.rotation.x += 0.01;
	torus.rotation.y += 0.01;

  camera.position.z = t * -0.05
  camera.position.x = t * -0.0002
  camera.position.y = t * -0.002

  console.log('')

}


document.body.onscroll = moveCam





function animate() {

  moon.rotation.x += 0.005
  moon.rotation.y += 0.0075
  

  ycube.rotation.z += 0.01
  ycube.rotation.y += 0.01

  torus.rotation.x += 0.01;
	torus.rotation.y += 0.01;
	

  ctrls.update()

	renderer.render( scene, camera );

}