import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';


function viewport3d(container, model)
{
    var mc = document.getElementById(container)

    // Create a scene
    const scene = new THREE.Scene();
    
    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, mc.offsetWidth / mc.offsetHeight, 0.1, 1000);
    camera.position.x = 1.3;
    camera.position.y = 0.1;
    camera.position.z = -0.7;
    
    // Create a renderer
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    

    renderer.setSize(mc.offsetWidth, mc.offsetHeight)
    mc.appendChild(renderer.domElement);
    

    // HDRI
    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    const hdriLoader = new RGBELoader();
    hdriLoader.load( 'hdri/field.hdr', function ( texture ) {
      const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
      texture.dispose(); 
      scene.environment = envMap
    } );

    // Handle mouse events for model interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.rotateSpeed = 0.5;
    
    // Load the glTF model
    const loader = new GLTFLoader();
    loader.load(model, function (gltf) {
        // Add the model to the scene	
        const model = gltf.scene;
    
        //model.rotation.y += 1.9;
        scene.add(model);
    
        // Create a directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(4, 5, 5); // Set the position of the light
        scene.add(directionalLight);
    
        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight2.position.set(-5, 3, 5); // Set the position of the light
        scene.add(directionalLight2);
    
        const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight3.position.set(6, -5, 5); // Set the position of the light
        scene.add(directionalLight3);
    
        const directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight4.position.set(5, 3, -5); // Set the position of the light
        scene.add(directionalLight4);
    
    
        const width = 10;
        const height = 10;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set( 3, 5, 0 );
        rectLight.lookAt( 0, 0, 0 );
        //scene.add( rectLight )
        
        const rectLightHelper = new RectAreaLightHelper( rectLight );
        //rectLight.add( rectLightHelper );
    
        
        const rectLight2 = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight2.position.set( -3, -5, 0 );
        rectLight2.lookAt( 0, 0, 0 );
        //scene.add( rectLight2 )
        
        const rectLightHelper2 = new RectAreaLightHelper( rectLight2 );
        //rectLight.add( rectLightHelper2 );
    
        // Animate the model
        const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
    
        animate();
    });
    
}

viewport3d('model-container1', './models/Crate.gltf')
viewport3d('model-container2', './models/Generator.gltf')
viewport3d('model-container3', './models/Scope.gltf')