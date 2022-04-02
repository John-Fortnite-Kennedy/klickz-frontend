import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit, AfterViewInit {

  constructor() {  }  

  @ViewChild('canvas') private canvasRef: ElementRef = ViewChild('canvas');

  @Input() public rotationSpeedX: number = 0.05;

  @Input() public rotationSpeedY: number = 0.01;

  @Input() public size: number = 600;

  @Input() public texture: string = "bruh";

  @Input() public cameraZ: number = 400;

  @Input() public filedOfView: number = 1;

  @Input('nearClipping') public nearClippingPlane: number = 1;

  @Input('farClipping') public farClippingPlane: number = 1000;

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement{
    return this.canvasRef.nativeElement;
  };

  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(4,4,4);
  private material = new THREE.MeshBasicMaterial({/*map: this.loader.load(this.texture)*/color: 0xF7F7F7,
  wireframe: true,
  wireframeLinewidth: 2});

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private createScene(){
    console.log(this.canvas + " this");
    this.scene = new THREE.Scene;
    this.scene.add(this.cube);

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.filedOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio(){
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private animate(){
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }


  startRenderingLoop() {
    this.renderer=new THREE.WebGLRenderer({canvas:this.canvas,alpha: true, antialias: true});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth,this.canvas.clientHeight);
    this.renderer.setAnimationLoop(() => {
    this.animate();
    this.renderer.render(this.scene, this.camera);
    });
    }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
  }

}
