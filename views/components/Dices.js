/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|     Project :  Dice Application
|
|    File Name:  home.js  
|  Description:  This is the file that holds the class of the home view.
|                
*===========================================================================*/
import { View as GraphicsView } from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import React from 'react';

export default class Dices extends React.Component {
  componentDidMount() {
    THREE.suppressExpoWarnings();
  }

  render() {
    return (
      <GraphicsView
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        style={{alignItems: 'stretch', flex:1}}
      />
    );
  }

  onContextCreate = async ({
    gl,
    canvas,
    width,
    height,
    scale: pixelRatio,
  }) => {
    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    this.renderer.setClearColor(0xffffff)
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    this.camera.position.z = 4.5;
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
    });
    
    this.firstCube = new THREE.Mesh(geometry, material);
    
    this.secondCube = new THREE.Mesh(geometry, material);
    
    this.scene.add(this.firstCube);
    this.scene.add(this.secondCube);

    this.firstCube.position.x -= .8;
    this.secondCube.position.x += .8;

    this.scene.add(new THREE.AmbientLight(0x404040));

    const light = new THREE.DirectionalLight(0xffffff, 0.6);
    light.position.set(0, 0, 2);
    this.scene.add(light);
  };

  onRender = delta => {
    this.firstCube.rotation.x += 5 * delta;
    this.firstCube.rotation.y += 3 * delta;
    this.secondCube.rotation.x -= 5 * delta;
    this.secondCube.rotation.y -= 3 * delta;
    this.renderer.render(this.scene, this.camera);
  };
}
