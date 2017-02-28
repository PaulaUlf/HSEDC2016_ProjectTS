var ww = window.innerWidth,
    wh = window.innerHeight;

var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas")
});
renderer.setClearColor(0x000000);
renderer.setSize(ww, wh);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(50, ww / wh, 1, 5000);
camera.position.set(0, 0, 200);

var controls = new THREE.OrbitControls(camera);

var sphere = new THREE.SphereBufferGeometry(50,50,50);
var spherePositions = sphere.attributes.position.array.slice(0);
var temp = sphere.attributes.position.array;
var material = new THREE.ShaderMaterial({
  uniforms: {},
  vertexShader: document.getElementById("wrapVertexShader").textContent,
  fragmentShader: document.getElementById("wrapFragmentShader").textContent
});
var colors = new Float32Array(sphere.attributes.position.array.length);
for(var i=0;i<sphere.attributes.position.array.length;i+=3){
  var perlin = Math.abs(noise.simplex3(sphere.attributes.position.array[i]*0.01, sphere.attributes.position.array[i+1]*0.01, sphere.attributes.position.array[i+2]*0.01));
  var color = new THREE.Vector3(perlin, 0.1, 0.8);
  color.toArray(colors, i);
}
sphere.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
var mesh = new THREE.Mesh(sphere, material);
scene.add(mesh);

window.addEventListener("resize", function() {
  ww = window.innerWidth;
  wh = window.innerHeight;
  camera.aspect = ww / wh;
  camera.updateProjectionMatrix();
  renderer.setSize(ww, wh);
});

function render(a) {
  requestAnimationFrame(render);
  for (var i = 0; i < temp.length; i+=3) {
    var perlin = noise.simplex3(temp[i]*0.008+a*0.0005,temp[i+1]*0.01+a*0.0005, temp[i+2]*0.008);
    temp[i] = spherePositions[i] + (perlin * 10);
    temp[i+1] = spherePositions[i+1] + (perlin * 10);
    temp[i+2] = spherePositions[i+2] + (perlin * 10);
  }
  sphere.addAttribute('position', new THREE.BufferAttribute(temp, 3));
  sphere.applyMatrix(new THREE.Matrix4().makeRotationY(a*0.001));

  renderer.render(scene, camera);
}

requestAnimationFrame(render);
