var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
//if user resizes screen project must readjust to viewport


  var geometry =  new THREE.BoxGeometry(1,2,3);
  var material =  new THREE.MeshBasicMaterial({color:0xFFFFFF,wireframe:true});
  var cube = new THREE.Mesh(geometry,material);
  scene.add(cube);
  cube.position.x = 0;
  var AMOUNT = 3;
  var SIZE = 1 / AMOUNT;
  var ASPECT_RATIO = window.innerWidth / window.innerHeight;
  var cameras = [];
  for ( var y = 0; y < AMOUNT; y ++ ) {
    for ( var x = 0; x < AMOUNT; x ++ ) {
      var subcamera = new THREE.PerspectiveCamera( 40, ASPECT_RATIO, 0.1, 10 );
      subcamera.bounds = new THREE.Vector4( x / AMOUNT, y / AMOUNT, SIZE, SIZE );
      subcamera.position.x = ( x / AMOUNT ) - 0.5;
      subcamera.position.y = 0.5 - ( y / AMOUNT );
      subcamera.position.z = 1.5;
      subcamera.position.multiplyScalar( 2 );
      subcamera.lookAt(cube.position);
      subcamera.updateMatrixWorld();
      cameras.push( subcamera );
    }
  }
  var camera = new THREE.ArrayCamera( cameras );

  camera.position.z = 3;


//game logic
var update = function(){
  camera.lookAt(cube.position);
  cube.rotation.x += 0.001;
  cube.rotation.y += 0.005;
};


// draws the scene

//Game Loop (update, render, repeat)
var GameLoop = function(){
  requestAnimationFrame(GameLoop);
    renderer.render(scene,camera );
  update( );
};
GameLoop( );
