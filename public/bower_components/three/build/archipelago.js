
// variables
let angle = 0
let radius = 20
let drawingSurface = document.getElementById( 'canvas' );
let renderer = new THREE.WebGLRenderer( { canvas: drawingSurface } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( 1000, 600 );

let seaLevel = 20;

// BASIC SET UP
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x87ceeb );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);



// Build World

// radiusTop, radiusBottom, height, radialSegments (faces around circumference), heightSegments( faces along height)

const world_geometry = new THREE.CylinderGeometry( 100, 100, 1, 20 )

const world_material = new THREE.MeshBasicMaterial ( {
  color: 0x006994,
  side: THREE.DoubleSide
});

const world = new THREE.Mesh (world_geometry, world_material)

scene.add(world)

// plane position
world.position.z = -100
world.position.y = seaLevel

camera.position.z = -10
camera.position.y = 25


// SUN  - is this even doing anything?
const sun = new THREE.DirectionalLight(0xFFFFFF);
sun.castShadow = true
scene.add(sun);

// WORLD BUILDERS

// TERRAIN



function raiseTerrain () {
  let terrainRadius = Math.floor(Math.random() * 20) + 1;
  console.log(`terrainRadius: ${terrainRadius}`)
  let terrainHeight = Math.floor(Math.random() * 40) + 1;
  console.log(`terrainHeight: ${terrainHeight}`)
  createPlane(terrainRadius, terrainHeight);
}


// radiusTop (terrainRadius), radiusBottom (terrainRadius), height (random - 1-5), radialSegments (faces around circumference - random, 5-20), heightSegments( faces along height - random, 5-20)

function createPlane(terrainRadius, terrainHeight) {
  let planeCount = 1
  let elevation = seaLevel
  let num = 50
  let planePositionX = getPosition(num);
  let planePositionZ = getPosition(num) - 100;
  let gradient = 1000
  while ( planeCount < terrainHeight && terrainRadius > 1) {
    let planeGeometry = new THREE.CylinderGeometry( terrainRadius, terrainRadius, 0.5, gradient )
    let planeMaterial = new THREE.MeshToonMaterial ( {
      color: getColour(planeCount),
      side: THREE.DoubleSide
    });
    let plane  = new THREE.Mesh (planeGeometry, planeMaterial)
    scene.add(plane)
    plane.position.z = -100
    plane.position.y = elevation
    plane.position.x = planePositionX + getPosition(0.5)
    plane.position.z = planePositionZ + getPosition(0.5)
    elevation += 0.5
    terrainRadius -= 0.6
    planeCount += 1
    if (planeCount >= 20 ) {
      gradient = 10
    }
  }
}

function getPosition(num) {
  let position = (Math.random() * num);
  position *= Math.round(Math.random()) ? 1 : -1;
  return position
}

function getColour(planeCount) {
  if (planeCount <= 2) {
    return 0xF2D16B
  }
  if (planeCount <=  4) {
    return 0x2D6514
  }
  else if (planeCount <= 8 ) {
    return 0x528124
  }
  else if (planeCount <= 12 ) {
    return 0x7C9D39
  }
  else if (planeCount <= 16 ) {
    return 0xAAB952
  }
  else if (planeCount <= 20 ) {
    return 0x8C8070
  }
  else if (planeCount <= 24 ) {
    return 0x9d9490
  }
  else if (planeCount <= 28 ) {
    return 0xb4adaa
  }
  else if (planeCount <= 32 ) {
    return 0xcbc6c4
  }
  else if (planeCount <= 36 ) {
    return 0xe2dfde
  }
  else if (planeCount >= 38 ) {
    return 0xf9f8f8
  }
}


function buildWorld() {
  let terrain = Math.floor(Math.random() * 40) + 30;
  for (terrain; terrain > 0; terrain--) {
    raiseTerrain();
    }
  }



// ANIMATE

function animate() {
  requestAnimationFrame ( animate );
  renderer.render ( scene, camera );

}


// BUILD WORLD

buildWorld();
animate();


// CAMERA CONTROLS


document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.key == "ArrowUp") {
        camera.position.y += 1;
    }
    else if (e.key == 'ArrowDown') {
      if (camera.position.y >= 25) {
      camera.position.y -= 1;
      }
    }
    else if (e.key == 'ArrowLeft') {
      camera.rotation.y += 0.02;
      console.log(THREE.Math.radToDeg(camera.rotation.y)  % 360)

    }
    else if (e.key == 'ArrowRight') {
      camera.rotation.y -= 0.02;
      console.log(THREE.Math.radToDeg(camera.rotation.y)  % 360)
    }

    else if (e.key == 'w') {
      direction = new THREE.Vector3();
      camera.getWorldDirection( direction );
      camera.position.add( direction );

      console.log(camera.position.z)
    }

    else if (e.key == 's') {
        camera.position.z += 1;
        console.log(camera.position.z)
    }

}

// function moveForward() {
//
//   angle = console.log(THREE.Math.radToDeg(camera.rotation.y)  % 360
//
//   if (camera.rotation.y === 0) {
//     camera.position.z -= 1;
//   }
//   else if (camera.rotation.y >0 && camera.rotation.y <0.90) {
//     camera.position.z -= 1;
//     camera.position.x -= 1;
//   }
//   else if (camera.rotation.y === 0.90) {
//     camera.position.x -= 1;
//    }
//   else if (camera.roation.y > 0.90 && camera.roation.y <1.80) {
//    camera.position.x -= 1;
//    camera.position.z += 1;
//  }
//  else if (camera.rotation.y === 1.80) {
//    camera.position.z += 1;
//   }
//   else if (camera.roation.y > 1.80 && camera.roation.y < 2.70) {
//    camera.position.x += 1;
//    camera.position.z -= 1;
//  }
//  else if (camera.roation.y === 2.70) {
//   camera.position.x += 1;
// }
// else if (camera.roation.y > 2.70 && camera.roation.y <359) {
//  camera.position.x += 1;
//  camera.position.z -= 1;
//  }
//  else if (camera.roation.y === 0) {
//   camera.position.z -= 1;
//   }
//
// }



//event listeners
about.addEventListener("click", function (e){
  e.preventDefault();
  openModal();
});

modal.addEventListener("click", function (e){
  e.preventDefault();
  closeModal();
});

function openModal() {
  modal.style.display = "block";
}


function closeModal() {
  modal.style.display = "none";
}
