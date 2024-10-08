import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

export function viewport3d(container, model, camx = 1.3, camy = 0.1, camz = -0.7)
{
    var mc = document.getElementById(container)

    // Create a scene
    const scene = new THREE.Scene();
    

    var width = mc.offsetWidth;
    var height = mc.offsetHeight;
    // Create a camera
    const camera = new THREE.PerspectiveCamera(45, mc.offsetWidth / mc.offsetHeight, 0.1, 1000);

    //const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );

    camera.position.x = camx
    camera.position.y = camy;
    camera.position.z = camz;
    
    // Create a renderer
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    

    renderer.setSize(width, height)
    mc.appendChild(renderer.domElement);
    

    // HDRI
    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    const hdriLoader = new RGBELoader();
    hdriLoader.load( '/hdri/field.hdr', function ( texture ) {
      const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
      texture.dispose(); 
      scene.environment = envMap
    } );

    // Handle mouse events for model interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    //controls.enablePan = false;
    controls.rotateSpeed = 0.5;
    
    // Load the glTF model
    const loader = new GLTFLoader();
    loader.load(model, function (gltf) {
        // Add the model to the scene	
        const model = gltf.scene;
    
        //model.rotation.y += 1.9;
        scene.add(model);
    
        // Create a directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight.position.set(4, 5, 5); // Set the position of the light
        scene.add(directionalLight);
    
        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight2.position.set(-5, 3, 5); // Set the position of the light
        scene.add(directionalLight2);
    
        const directionalLight3 = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight3.position.set(6, -5, 5); // Set the position of the light
        scene.add(directionalLight3);
    
        const directionalLight4 = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight4.position.set(5, 3, -5); // Set the position of the light
        scene.add(directionalLight4);
    
    
        const width = 1;
        const height = 1;
        const intensity = 3;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set( -2, 2, 3 );
        rectLight.lookAt( 0, 0, 0 );
        //scene.add( rectLight )
        
        const rectLightHelper = new RectAreaLightHelper( rectLight );
        //rectLight.add( rectLightHelper );
    
        
        const rectLight2 = new THREE.RectAreaLight( 0xffffff, intensity * 1000.0,  width, height );
        rectLight2.position.set(1,-1 ,1);
        rectLight2.lookAt( 0, 0, 0 );
        //scene.add( rectLight2 )
        
        const rectLightHelper2 = new RectAreaLightHelper( rectLight2 );
        //rectLight.add( rectLightHelper2 );
        renderer.setClearColor( 0xffffff, 0);
        // Animate the model
        var count = 0;
        var getcam = false;
        const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);

            // for config only
            if (getcam)
            {
                count++;
                if (count >= 60) // every 10s display the cam position
                {
                    //console.log(container + " -> " + controls.object.position.x + ","+controls.object.position.y+","+controls.object.position.z);
                    console.log(container + " -> " + camera.position.x + ","+camera.position.y+","+camera.position.z);
                    count = 0;
                }
            }
        };
    
        animate();
    });
    
}