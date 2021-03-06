
// variables

let groundLevel = 20;

// BASIC SET UP
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x87ceeb );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer( ); // add { alpha: true } to set background to transparent
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);


// Build World

// radiusTop, radiusBottom, height, radialSegments (faces around circumference), heightSegments( faces along height)

const world_geometry = new THREE.CylinderGeometry( 50, 50, 1, 20 )

const world_material = new THREE.MeshBasicMaterial ( {
  color: 0x136d15,
  side: THREE.DoubleSide
});

const world = new THREE.Mesh (world_geometry, world_material)

scene.add(world)

// plane position
world.position.z = -100
world.position.y = groundLevel

camera.position.z = -10
camera.position.y = 50


// SUN  - is this even doing anything?
const sun = new THREE.DirectionalLight(0xFFFFFF);
sun.castShadow = true
scene.add(sun);

// WORLD BUILDERS

// Mountain



function raiseMountain () {
  let planePosition = groundLevel
  let mountainRadius = 25
  let mountainHeight = 20
  // setPlaneProperties(mountainRadius, mountainHeight);
  let planeCount = mountainHeight / 5
  createPlane(mountainRadius, mountainHeight, planePosition, planeCount);
}

// function setPlaneProperties() {
//   let mountainRadius = Math.floor(Math.random() * (10 - 30) + 10);
//   let mountainHeight = Math.floor(Math.random() * (10 - 30) + 10);
//   console.log(mountainRadius)
//   console.log(mountainHeight)
// }

// radiusTop, radiusBottom, height, radialSegments (faces around circumference), heightSegments( faces along height)


function createPlane(mountainRadius, mountainHeight, planePosition, planeCount) {
    let i = 0
  for (i = 0; i < planeCount; i++) {
    console.log("Generating plane")
    let planeGeometry = new THREE.CylinderGeometry( mountainRadius, mountainRadius, 5, 20 )
    let planeMaterial = new THREE.MeshBasicMaterial ( {
      color: 0x7a7372,
      side: THREE.DoubleSide
    });
    let plane  = new THREE.Mesh (planeGeometry, planeMaterial)
    scene.add(plane)
    plane.position.z = -100
    plane.position.y = planePosition += 5
  }
}


raiseMountain()


// CONFIG

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
        camera.rotation.x += 0.05;
    }
    else if (e.keyCode == '40') {
      camera.rotation.x -= 0.05;
    }
    else if (e.keyCode == '37') {
      camera.rotation.y += 0.05;
    }
    else if (e.keyCode == '39') {
      camera.rotation.y -= 0.05;
    }

}
