var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();

//canvas reposition attempt


renderer.setSize(1170,1170);
document.body.appendChild(renderer.domElement);
document.getElementById("hologram").appendChild(renderer.domElement);
renderer.position = innerWidth / 2;

var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial({color:0xFFFFFF,wireframe:true});
var cube = new THREE.Mesh(geometry,material);
scene.add(cube);
cube.position.x = 0;

var cameras = [];

var ASPECT_RATIO = 1170 / 1170;

var AMOUNT = 3;
var SIZE = 1 / AMOUNT;
//RIGHT CAM
var subcam1 = new THREE.PerspectiveCamera(75,ASPECT_RATIO,0.1,1000);
subcam1.bounds = new THREE.Vector4(2 / AMOUNT, 1 / AMOUNT,SIZE,SIZE);
subcam1.position.x = 2;
subcam1.position.y = 0;
subcam1.position.z = 0;
subcam1.rotation.x = 90;
subcam1.lookAt(cube.position);
subcam1.updateMatrixWorld();
cameras.push(subcam1);

//DOWN CAM
var subcam2 = new THREE.PerspectiveCamera(75,ASPECT_RATIO,0.1,1000);
subcam2.bounds = new THREE.Vector4( 1 / AMOUNT, 0 / AMOUNT,SIZE,SIZE );
subcam2.position.x = -2;
subcam2.position.y = 0;
subcam2.position.z = 0;
subcam2.lookAt(cube.position);
subcam2.updateMatrixWorld();
cameras.push(subcam2);
//UP CAM
var subcam3 = new THREE.PerspectiveCamera(75,ASPECT_RATIO,1000,0.1);
subcam3.bounds = new THREE.Vector4( 1 / AMOUNT, 2 / AMOUNT,SIZE,SIZE );
subcam3.position.x = 0;
subcam3.position.y = -2;
subcam3.position.z = 0;
subcam3.lookAt(0,0,0);
subcam3.updateMatrixWorld();
cameras.push(subcam3);
//DOWN CAM
var subcam3 = new THREE.PerspectiveCamera(75,ASPECT_RATIO,1000,0.1);
subcam3.bounds = new THREE.Vector4( 0 / AMOUNT, 1 / AMOUNT,SIZE,SIZE );
subcam3.position.x = 0;
subcam3.position.y = 2;
subcam3.position.z = 0;
subcam3.lookAt(0,0,0);
subcam3.updateMatrixWorld();
cameras.push(subcam3);

var camera = new THREE.ArrayCamera(cameras);
cube.position.x = 0;
camera.position.z = 0;
//WIP
var update = function(){

  cube.rotation.x += 0.001;
  cube.rotation.y += 0.005;
};
var Loop = function(){
  requestAnimationFrame(Loop);
  renderer.render(scene,camera);

  update();
};
Loop();
