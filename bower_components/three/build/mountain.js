


// BASIC SET UP
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x87ceeb );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer( ); // add { alpha: true } to set background to transparent
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

// const geometry = new THREE.DodecahedronGeometry(2, 1);
// const material = new THREE.MeshBasicMaterial( {
//   color: 0x00ff00
// })
// const cube = new THREE.Mesh (geometry, material);
// scene.add( cube );
// camera.position.z = 5
//
//
// function animate() {
//   requestAnimationFrame ( animate );
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render ( scene, camera );
//
// }
// animate();


// const WIDTH = 400;
// const HEIGHT = 300;
//
// const VIEW_ANGLE = 45;
// const ASPECT = WIDTH / HEIGHT;
// const NEAR = 0.1;
// const FAR = 10000;
//
// const renderer = new THREE.WebGLRenderer();
// const camera = new THREE.PerspectiveCamera ( VIEW_ANGLE, ASPECT, NEAR, FAR );
// const scene = new THREE.Scene();
//
// scene.add(camera);
// renderer.setSize(WIDTH, HEIGHT);
// document.body.appendChild(renderer.domElement);

// const RADIUS = 50;
// const SEGMENTS = 16;
// const RINGS = 16;
// const sphereMaterial = new THREE.MeshLambertMaterial(
//   {
//   color: 0xCC0000
// })
//
// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry( RADIUS, SEGMENTS, RINGS),
//
//   sphereMaterial);
//


// radiusTop, radiusBottom, height, radialSegments (faces around circumference), heightSegments( faces along height)

const geometry = new THREE.CylinderGeometry( 50, 50, 1, 20 )

const material = new THREE.MeshBasicMaterial ( {
  color: 0x136d15,
  side: THREE.DoubleSide
});

const world = new THREE.Mesh (geometry, material)

scene.add(world)

// plane position
world.position.z = -100
world.position.y = 20

camera.position.z = -10
camera.position.y = 50


const sun = new THREE.DirectionalLight(0xFFFFFF);
sun.castShadow = true

// set its position


// add to the scene
scene.add(sun);




// Animate the scene
function animate() {
  requestAnimationFrame ( animate );
  renderer.render ( scene, camera );

}

animate();


// KEY PRESS DETECTION

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        world.rotation.x += 0.05;
    }
    else if (e.keyCode == '40') {
      world.rotation.x -= 0.05;
    }
    else if (e.keyCode == '37') {
      world.rotation.y += 0.05;
    }
    else if (e.keyCode == '39') {
      world.rotation.y -= 0.05;
    }

}
