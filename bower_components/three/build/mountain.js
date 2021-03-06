
// variables

let seaLevel = 20;


// BASIC SET UP
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x87ceeb );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer( ); // add { alpha: true } to set background to transparent
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);


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
camera.position.y = 50


// SUN  - is this even doing anything?
const sun = new THREE.DirectionalLight(0xFFFFFF);
sun.castShadow = true
scene.add(sun);

// WORLD BUILDERS

// TERRAIN



function raiseTerrain () {
  let terrainRadius = Math.floor(Math.random() * 20) + 1;
  console.log(`terrainRadius: ${terrainRadius}`)
  let terrainHeight = Math.floor(Math.random() * 20) + 1;
  console.log(`terrainHeight: ${terrainHeight}`)
  createPlane(terrainRadius, terrainHeight);
}


// radiusTop (terrainRadius), radiusBottom (terrainRadius), height (random - 1-5), radialSegments (faces around circumference - random, 5-20), heightSegments( faces along height - random, 5-20)

function createPlane(terrainRadius, terrainHeight) {
  let planeCount = 1
  let elevation = seaLevel
  let planePositionX = getPosition();
  let planePositionZ = getPosition() - 100;
  while ( planeCount < terrainHeight && terrainRadius > 1) {
    let planeGeometry = new THREE.CylinderGeometry( terrainRadius, terrainRadius, 1, 15, 20 )
    let planeMaterial = new THREE.MeshBasicMaterial ( {
      color: getColour(planeCount),
      side: THREE.DoubleSide
    });
    let plane  = new THREE.Mesh (planeGeometry, planeMaterial)
    scene.add(plane)
    plane.position.z = -100
    plane.position.y = elevation
    plane.position.x = planePositionX
    plane.position.z = planePositionZ
    elevation += 1
    terrainRadius -= 1
    planeCount += 1
  }
}

function getPosition() {
  let position = Math.floor(Math.random() * 50);
  position *= Math.round(Math.random()) ? 1 : -1;
  return position
}

function getColour(planeCount) {
  if (planeCount === 1) {
    return 0xF2D16B
  }
  if (planeCount <= 3 ) {
    return 0x2D6514
  }
  else if (planeCount <= 4 ) {
    return 0x528124
  }
  else if (planeCount <= 6 ) {
    return 0x7C9D39
  }
  else if (planeCount <= 8 ) {
    return 0x7C9D39
  }
  else if (planeCount <= 10 ) {
    return 0xAAB952
  }
  else if (planeCount <= 12 ) {
    return 0xAAB952
  }
  else if (planeCount <= 14 ) {
    return 0x9d9490
  }
  else if (planeCount <= 16 ) {
    return 0xb4adaa
  }
  else if (planeCount <= 18 ) {
    return 0xcbc6c4
  }
  else if (planeCount <= 20 ) {
    return 0xe2dfde
  }
  else if (planeCount === 11 ) {
    return 0xf9f8f8
  }
}


function buildWorld() {
  let terrain = Math.floor(Math.random() * 150) + 50;
  for (terrain; terrain > 0; terrain--) {
    raiseTerrain();
  }
}

buildWorld();

// CONFIG

function animate() {
  requestAnimationFrame ( animate );
  renderer.render ( scene, camera );

}

animate();


// KEY PRESS DETECTION - update (below is deprecated)

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        camera.position.y += 1;
    }
    else if (e.keyCode == '40') {
      camera.position.y -= 1;
    }
    else if (e.keyCode == '37') {
      camera.position.x += 1;
    }
    else if (e.keyCode == '39') {
      camera.position.x -= 1;
    }

    else if (e.keyCode == '87') {
      camera.position.z -= 1;
    }

    else if (e.keyCode == '83') {
      camera.position.z += 1;
    }

    else if (e.keyCode == '65') {
      camera.rotation.y += 0.05;
    }

     else if (e.keyCode == '68') {
       camera.rotation.y -= 0.05;
      }

}
