// You can use import statements here!
//
// More information about how to do this here:
// https://threejs.org/docs/#manual/en/introduction/Import-via-modules

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  IcosahedronGeometry,
  MeshNormalMaterial,
  Mesh,
  PointLight,
  AmbientLight,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Quaternion,
  Vector3,
  Box3
} from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';



// Object Loader
// instantiate a loader
const loader = new OBJLoader();
var teapot, sphere;

const scene = new Scene();

var selectedObject = null;
var selectedLight = null;
var transformMode = 0;
var illuminator = 0;
var shadingModel = 0;
var cameraMove = 0;
var bBox = null;

// load a resource
loader.load(
	// resource URL
	'/teapot.obj',
	// called when resource is loaded
	function ( object ) {
    teapot = object;
		scene.add( object );
    object.position.x = -4;

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


// load a resource
loader.load(
	// resource URL
	'/sphere1.obj',
	// called when resource is loaded
	function ( object ) {
    sphere = object;
		scene.add( object );
    object.position.x = 4;

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);



const light1 = new PointLight( 0xffff00, 1, 100 );
light1.position.set(-4,1,0);
scene.add( light1);

const light2 = new PointLight( 0x000fff, 1, 100 );
light2.position.set(4,1,0);
scene.add(light2);

const light3 = new AmbientLight( 0x160a0a );
scene.add( light3 );


const camera = new PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

document.addEventListener('keydown', (event) => {
	var name = event.key;
	var code = event.code;

	// Alert the key name and key code on keydown
	console.log(`Key pressed ${name}`);

	// toggle light off
	if (name == '0' && illuminator == 1){
		if (selectedLight != null){
			// turn off light
			selectedLight.intensity = 0;
		}
	}

	// toggle light on
	else if (name == '1' && illuminator == 1){
		if (selectedLight != null){
			// turn on light
			selectedLight.intensity = 1;
		}
	}

	else if (name == '2'){
		selectedObject = null;
		selectedLight = null;
		console.log("None selected");
	}

	else if (name == '3'){
		selectedObject = teapot;
		selectedLight = light1;
		console.log("Teapot selected");
	}

	else if (name == '4'){
		selectedObject = sphere;
		selectedLight = light2;
		console.log("Sphere selected");
	}

	// switching mode
	else if (name == 's' || name == 'S'){
		shadingModel = 1 - shadingModel;

		if (!selectedObject){}

		else if (shadingModel){
			// phong
			selectedObject.traverse(function(child) {
				if(child instanceof Mesh)
				{
					child.material = new MeshPhongMaterial();
				}
			})
			console.log("Phong shader");
		}
		else{
			// gouraud
			selectedObject.traverse(function(child) {
				if(child instanceof Mesh)
				{
					child.material = new MeshLambertMaterial();
				}
			})
			console.log("Gouraud shader");
		}
	}

	// transform mesh mode
	else if (name == 'm' || name == 'M'){
		transformMode = 1 - transformMode;

		if (transformMode){
			cameraMove = 0;
			console.log("Transform mode selected");
		}
		else{
			cameraMove = 1;
			console.log("Transform mode unselected");
		}
	}

	// illumination mode
	else if (name == 'l' || name == 'L'){
		illuminator = 1 - illuminator;

		if (illuminator){
			console.log("Illuminator control on");
		}
		else{
			console.log("Illuminator control off");
		}
	}

	// camera movement mode
	else if (name == 'a' || name == 'A'){
		cameraMove = 1 - cameraMove;

		if (cameraMove){
			transformMode = 0;
			console.log("Camera movement on");
		}
		else{
			transformMode = 1;
			console.log("Camera movement off");
		}
	}

	// zoom in
	else if ((name == '+' || name == '=') && transformMode == 1){
		selectedObject.scale.x += 0.05;
		selectedObject.scale.y += 0.05;
		selectedObject.scale.z += 0.05;
	}

	// zoom out
	else if ((name == '-' || name == '_') && transformMode == 1){
		selectedObject.scale.x -= 0.05;
		selectedObject.scale.y -= 0.05;
		selectedObject.scale.z -= 0.05;
	}


	// object movement
	// x left
	else if ((name == 't' || name == 'T') && transformMode == 1){
		if (selectedObject != null){
			selectedObject.position.x += 0.1;
			selectedLight.position.x += 0.1;
		}
	}

	// x right
	else if ((name == 'y' || name == 'Y') && transformMode == 1){
		if (selectedObject != null){
			selectedObject.position.x -= 0.1;
			selectedLight.position.x -= 0.1;
		}
	}

	// y left
	else if ((name == 'u' || name == 'U') && transformMode == 1){
		if (selectedObject != null){
			selectedObject.position.y += 0.1;
			selectedLight.position.y += 0.1;
		}
	}

	// y right
	else if ((name == 'i' || name == 'I') && transformMode == 1){
		if (selectedObject != null){
			selectedObject.position.y -= 0.1;
			selectedLight.position.y -= 0.1;
		}
	}

	// z left
	else if ((name == 'o' || name == 'O') && transformMode == 1){
		if (selectedObject != null){
			selectedObject.position.z += 0.1;
			selectedLight.position.z += 0.1;
		}
	}

	// z right
	else if ((name == 'p' || name == 'P') && transformMode == 1){
		if (selectedObject != null){
			selectedObject.position.z -= 0.1;
			selectedLight.position.z -= 0.1;
		}
	}


	// light movement
	// light x left
	else if ((name == 'z' || name == 'Z') && illuminator == 1){
		if (selectedObject != null){
			bBox = new Box3().setFromObject(selectedObject);
			if(selectedLight.position.x < 1.25 * bBox.max.x)
			{
				selectedLight.position.x += 0.1;
			}
		}
	}

	// light x right
	else if ((name == 'x' || name == 'X') && illuminator == 1){
		if (selectedObject != null){
			bBox = new Box3().setFromObject(selectedObject);
			if(selectedLight.position.x > 1.25 * bBox.min.x)
			{
				selectedLight.position.x -= 0.1;
			}
		}
	}

	// light y left
	else if ((name == 'c' || name == 'C') && illuminator == 1){
		if (selectedObject != null){
			bBox = new Box3().setFromObject(selectedObject);
			if(selectedLight.position.y < 1.25 * bBox.max.y)
			{
				selectedLight.position.y += 0.1;
			}
		}
	}

	// light y right
	else if ((name == 'v' || name == 'V') && illuminator == 1){
		if (selectedObject != null){
			bBox = new Box3().setFromObject(selectedObject);
			if(selectedLight.position.y > 1.25 * bBox.min.y)
			{
				selectedLight.position.y -= 0.1;
			}
		}
	}

	// light z left
	else if ((name == 'b' || name == 'B') && illuminator == 1){
		if (selectedObject != null){
			bBox = new Box3().setFromObject(selectedObject);
			if(selectedLight.position.z < 1.25 * bBox.max.z)
			{
				selectedLight.position.z += 0.1;
			}
		}
	}

	// light z right
	else if ((name == 'n' || name == 'N') && illuminator == 1){
		if (selectedObject != null){
			bBox = new Box3().setFromObject(selectedObject);
			if(selectedLight.position.z > 1.25 * bBox.min.z)
			{
				selectedLight.position.z -= 0.1;
			}
		}
	}

	// camera movement
	// camera x left
	else if ((name == '[' || name == '{') && cameraMove == 1){
		camera.position.x += 0.1;
	}

	// camera x right
	else if ((name == ']' || name == '}') && cameraMove == 1){
		camera.position.x -= 0.1;
	}

	// camera y left
	else if ((name == ':' || name == ';') && cameraMove == 1){
		camera.position.y += 0.1;
	}

	// camera y right
	else if ((name == '\'' || name == '\"') && cameraMove == 1){
		camera.position.y -= 0.1;
	}

	// camera z left
	else if ((name == ',' || name == '<') && cameraMove == 1){
		camera.position.z += 0.1;
	}

	// camera z right
	else if ((name == '.' || name == '>') && cameraMove == 1){
		camera.position.z -= 0.1;
	}

	camera.lookAt(new Vector3(0,0,0));

}, false);



let leftPress;
let lastMouseX, lastMouseY;
window.addEventListener("mousedown", (event) => {

	if(selectedObject)
	{
		leftPress = true;

		if(transformMode == 1)
		{
			lastMouseX = event.clientX;
			lastMouseY = event.clientY;
		}

		window.addEventListener("mouseup", (event) => {
			leftPress = false;
		})

		window.addEventListener("mouseout", (event) => {
			leftPress = false;
		})

		window.addEventListener("mousemove", (event) => {
			if(leftPress === true && selectedObject && transformMode == 1){

				let currentX = event.clientX;
				let currentY = event.clientY;

				console.log(lastMouseX-currentX);

				const quaternionX = new Quaternion();
				const quaternionY = new Quaternion();
				let dAngleY = 0.0001 * (currentX - lastMouseX);
				quaternionX.setFromAxisAngle(new Vector3(0,1,0), (currentX - lastMouseX) * 0.00001);
				quaternionY.setFromAxisAngle(new Vector3(1,0,0), (currentY - lastMouseY) * 0.00001);
				selectedObject.applyQuaternion(quaternionX);
				selectedObject.applyQuaternion(quaternionY);

			}
		})
	}

})



camera.position.z = 5;

const renderer = new WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor( 0x000000, 1 );

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
