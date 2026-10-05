import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Zap, 
  Compass, 
  ShieldCheck, 
  Camera, 
  Eye, 
  Sparkles,
  BedDouble,
  Wifi,
  Thermometer,
  RotateCw,
  Move
} from 'lucide-react';

export default function Bus3DHero() {
  const mountRef = useRef(null);
  const [activeCamPreset, setActiveCamPreset] = useState('cinematic'); // 'cinematic' | 'interior' | 'chase' | 'side' | 'front'
  const [autoRotate, setAutoRotate] = useState(true);

  // Mutable state accessible in the render loop without causing re-renders
  const controlsStateRef = useRef({
    preset: 'cinematic',
    isInterior: false,
    autoRotate: true,
    // Exterior spherical coordinates (orbit around 0, 1.0, 0)
    radius: 6.8,
    theta: 0.75, // Horizontal angle (0 to 2*PI)
    phi: 1.25,   // Vertical angle (0 to PI)
    // Interior First-Person 360 look angles (yaw & pitch)
    interiorYaw: 0.1,    // 0 = look forward down the aisle toward windshield
    interiorPitch: 0.05, // 0 = level horizon
    // Position of passenger inside sleeper berth #L4
    interiorCamPos: new THREE.Vector3(-0.35, 1.25, 0.2),
    // Target position for smooth interpolation
    camPos: new THREE.Vector3(4.4, 2.2, 5.6),
    targetPos: new THREE.Vector3(0, 0.95, 0.2)
  });

  // Switch camera angles
  const setCameraPreset = (preset) => {
    setActiveCamPreset(preset);
    const state = controlsStateRef.current;
    state.preset = preset;

    if (preset === 'interior') {
      state.isInterior = true;
      state.autoRotate = false;
      setAutoRotate(false);
      state.interiorYaw = 0.15; // looking forward towards windshield & dashboard
      state.interiorPitch = 0.0;
    } else {
      state.isInterior = false;
      if (preset === 'cinematic') {
        state.theta = 0.75;
        state.phi = 1.25;
        state.radius = 6.8;
      } else if (preset === 'chase') {
        state.theta = Math.PI - 0.25;
        state.phi = 1.35;
        state.radius = 6.4;
      } else if (preset === 'side') {
        state.theta = Math.PI / 2;
        state.phi = 1.45;
        state.radius = 6.2;
      } else if (preset === 'front') {
        state.theta = 0.02;
        state.phi = 1.45;
        state.radius = 6.5;
      }
    }
  };

  const toggleAutoRotate = () => {
    setAutoRotate(prev => {
      const next = !prev;
      controlsStateRef.current.autoRotate = next;
      return next;
    });
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0f1d, 0.022);

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 140);
    camera.position.set(4.4, 2.2, 5.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Cinematic Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x27244d, 1.4);
    scene.add(ambientLight);

    const sunsetKeyLight = new THREE.DirectionalLight(0xf43f5e, 2.8);
    sunsetKeyLight.position.set(12, 14, 8);
    sunsetKeyLight.castShadow = true;
    sunsetKeyLight.shadow.mapSize.width = 1024;
    sunsetKeyLight.shadow.mapSize.height = 1024;
    sunsetKeyLight.shadow.bias = -0.001;
    scene.add(sunsetKeyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x06b6d4, 3.2);
    cyanRimLight.position.set(-14, 8, -6);
    scene.add(cyanRimLight);

    // Underglow Neon Lights
    const underglowCyan = new THREE.PointLight(0x06b6d4, 4.5, 7.5);
    underglowCyan.position.set(0, 0.25, 0);
    scene.add(underglowCyan);

    const underglowMagenta = new THREE.PointLight(0xd946ef, 3.5, 6.5);
    underglowMagenta.position.set(0, 0.3, -1.5);
    scene.add(underglowMagenta);

    // 3. Wet Specular Highway Asphalt
    const roadWidth = 14;
    const roadLength = 95;
    const roadGeo = new THREE.PlaneGeometry(roadWidth, roadLength, 32, 32);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.28,
      metalness: 0.65
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.z = -15;
    road.receiveShadow = true;
    scene.add(road);

    // Glowing Shoulder Rails
    const railMatL = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    const railMatR = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const railGeo = new THREE.BoxGeometry(0.12, 0.16, roadLength);

    const railLeft = new THREE.Mesh(railGeo, railMatL);
    railLeft.position.set(-roadWidth / 2 + 0.5, 0.08, -15);
    scene.add(railLeft);

    const railRight = new THREE.Mesh(railGeo, railMatR);
    railRight.position.set(roadWidth / 2 - 0.5, 0.08, -15);
    scene.add(railRight);

    // Scrolling Lane Dashes & Amber Cat's Eyes
    const stripes = [];
    const catEyes = [];
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const stripeGeo = new THREE.PlaneGeometry(0.2, 2.4);
    const catEyeGeo = new THREE.BoxGeometry(0.08, 0.06, 0.16);
    const catEyeMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });

    const numRows = 24;
    for (let i = 0; i < numRows; i++) {
      const zPos = -45 + i * 4.5;
      [-2.8, 0, 2.8].forEach((xLane) => {
        const s = new THREE.Mesh(stripeGeo, stripeMat);
        s.rotation.x = -Math.PI / 2;
        s.position.set(xLane, 0.02, zPos);
        scene.add(s);
        stripes.push(s);
      });

      const cat = new THREE.Mesh(catEyeGeo, catEyeMat);
      cat.position.set(0, 0.04, zPos + 1.2);
      scene.add(cat);
      catEyes.push(cat);
    }

    // Overhead Highway Gantry
    const gantryGroup = new THREE.Group();
    const gantryFrameMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3 });
    const gantryPostL = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 4.8), gantryFrameMat);
    gantryPostL.position.set(-6, 2.4, 0);
    const gantryPostR = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 4.8), gantryFrameMat);
    gantryPostR.position.set(6, 2.4, 0);
    const gantryCross = new THREE.Mesh(new THREE.BoxGeometry(12.4, 0.3, 0.3), gantryFrameMat);
    gantryCross.position.set(0, 4.6, 0);

    const signBoard = new THREE.Mesh(
      new THREE.BoxGeometry(7.5, 1.2, 0.15),
      new THREE.MeshStandardMaterial({ color: 0x047857, roughness: 0.3, metalness: 0.2 })
    );
    signBoard.position.set(0, 4.6, 0.18);

    gantryGroup.add(gantryPostL, gantryPostR, gantryCross, signBoard);
    gantryGroup.position.set(0, 0, -40);
    scene.add(gantryGroup);

    // Roadside Streetlight Poles
    const lightPoles = [];
    const poleCount = 6;
    for (let i = 0; i < poleCount; i++) {
      const poleGroup = new THREE.Group();
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 5.5), gantryFrameMat);
      mast.position.y = 2.75;
      const arm = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.08), gantryFrameMat);
      arm.position.set(-0.6, 5.4, 0);
      const lampHead = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.25), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
      lampHead.position.set(-1.2, 5.35, 0);

      const poleLight = new THREE.PointLight(0xfef08a, 1.2, 9);
      poleLight.position.set(-1.2, 5.0, 0);

      poleGroup.add(mast, arm, lampHead, poleLight);
      poleGroup.position.set(roadWidth / 2 + 0.8, 0, -50 + i * 20);
      scene.add(poleGroup);
      lightPoles.push(poleGroup);
    }

    // Rich Starfield Particles
    const starCount = 450;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 80;
      starPositions[i + 1] = Math.random() * 28 + 3;
      starPositions[i + 2] = -Math.random() * 60 - 5;

      const palette = [
        [0.02, 0.71, 0.83],
        [0.96, 0.25, 0.37],
        [0.98, 0.75, 0.14],
        [0.85, 0.90, 1.00]
      ];
      const col = palette[Math.floor(Math.random() * palette.length)];
      starColors[i] = col[0];
      starColors[i + 1] = col[1];
      starColors[i + 2] = col[2];
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.9 });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // =========================================================================
    // 4. COACH EXTERIOR CHASSIS
    // =========================================================================
    const busGroup = new THREE.Group();

    const coachBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x1d244d,
      metalness: 0.88,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.95,
      side: THREE.FrontSide
    });

    const bodyLength = 4.8;
    const bodyHeight = 1.48;
    const bodyWidth = 1.75;
    const bodyGeo = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyLength);
    const body = new THREE.Mesh(bodyGeo, coachBodyMat);
    body.position.y = 1.12;
    body.castShadow = true;
    body.receiveShadow = true;
    busGroup.add(body);

    // Front Bumper
    const frontBumper = new THREE.Mesh(
      new THREE.BoxGeometry(bodyWidth + 0.04, 0.4, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3 })
    );
    frontBumper.position.set(0, 0.45, bodyLength / 2 + 0.15);
    busGroup.add(frontBumper);

    // Front Chrome Grille & Volvo Slash Badge
    const frontGrille = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.28, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.95, roughness: 0.15 })
    );
    frontGrille.position.set(0, 0.52, bodyLength / 2 + 0.38);
    busGroup.add(frontGrille);

    const slashBadge = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 0.04, 0.08),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 1.0, roughness: 0.05 })
    );
    slashBadge.rotation.z = Math.PI / 6;
    slashBadge.position.set(0, 0.52, bodyLength / 2 + 0.41);
    busGroup.add(slashBadge);

    // Glowing Destination LED Matrix Display
    const ledBoard = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.22, 0.05),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    ledBoard.position.set(0, 1.75, bodyLength / 2 + 0.04);
    busGroup.add(ledBoard);

    // Windshield (Transparent DoubleSide)
    const windshield = new THREE.Mesh(
      new THREE.PlaneGeometry(1.58, 0.95),
      new THREE.MeshPhysicalMaterial({
        color: 0x083344,
        metalness: 0.9,
        roughness: 0.08,
        transparent: true,
        opacity: 0.82,
        side: THREE.DoubleSide
      })
    );
    windshield.position.set(0, 1.25, bodyLength / 2 + 0.02);
    busGroup.add(windshield);

    // Side Windows
    const sideGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide
    });
    const sideWindowLength = 3.9;
    const windowStripGeo = new THREE.PlaneGeometry(sideWindowLength, 0.52);

    const leftWindows = new THREE.Mesh(windowStripGeo, sideGlassMat);
    leftWindows.rotation.y = -Math.PI / 2;
    leftWindows.position.set(-bodyWidth / 2 - 0.01, 1.35, -0.15);
    busGroup.add(leftWindows);

    const rightWindows = new THREE.Mesh(windowStripGeo, sideGlassMat);
    rightWindows.rotation.y = Math.PI / 2;
    rightWindows.position.set(bodyWidth / 2 + 0.01, 1.35, -0.15);
    busGroup.add(rightWindows);

    // Sleeper Window Frame Dividers
    for (let p = 0; p < 5; p++) {
      const dividerGeo = new THREE.BoxGeometry(0.04, 0.54, 0.06);
      const dividerMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.5 });
      const pillarL = new THREE.Mesh(dividerGeo, dividerMat);
      pillarL.position.set(-bodyWidth / 2 - 0.02, 1.35, -1.6 + p * 0.8);
      busGroup.add(pillarL);

      const pillarR = new THREE.Mesh(dividerGeo, dividerMat);
      pillarR.position.set(bodyWidth / 2 + 0.02, 1.35, -1.6 + p * 0.8);
      busGroup.add(pillarR);
    }

    // Indian Tricolor Stripes
    const stripeLength = 4.2;
    const saffronMat = new THREE.MeshBasicMaterial({ color: 0xff9933 });
    const whiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const greenMat = new THREE.MeshBasicMaterial({ color: 0x138808 });

    [-1, 1].forEach((side) => {
      const xPos = (bodyWidth / 2 + 0.015) * side;
      const rotY = side === 1 ? Math.PI / 2 : -Math.PI / 2;

      const s1 = new THREE.Mesh(new THREE.PlaneGeometry(stripeLength, 0.07), saffronMat);
      s1.rotation.y = rotY;
      s1.position.set(xPos, 0.98, -0.15);
      busGroup.add(s1);

      const s2 = new THREE.Mesh(new THREE.PlaneGeometry(stripeLength, 0.05), whiteMat);
      s2.rotation.y = rotY;
      s2.position.set(xPos, 0.90, -0.15);
      busGroup.add(s2);

      const s3 = new THREE.Mesh(new THREE.PlaneGeometry(stripeLength, 0.07), greenMat);
      s3.rotation.y = rotY;
      s3.position.set(xPos, 0.82, -0.15);
      busGroup.add(s3);
    });

    // Roof AC & Rear Spoiler
    const acUnit = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.28, 2.5),
      new THREE.MeshStandardMaterial({ color: 0x090d16, metalness: 0.7, roughness: 0.3 })
    );
    acUnit.position.set(0, 1.95, -0.4);
    busGroup.add(acUnit);

    const roofSpoiler = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.14, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x1d244d, metalness: 0.9, roughness: 0.1 })
    );
    roofSpoiler.position.set(0, 1.95, -bodyLength / 2 + 0.2);
    busGroup.add(roofSpoiler);

    // =========================================================================
    // 5. 360-DEGREE FULL INTERIOR CABIN MODEL (Front, Sides, Rear & Ceiling)
    // =========================================================================
    const interiorGroup = new THREE.Group();

    // Aisle Floor with Cyan LED Guide Strips
    const aisleFloor = new THREE.Mesh(
      new THREE.BoxGeometry(1.65, 0.04, 4.6),
      new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 })
    );
    aisleFloor.position.set(0, 0.42, -0.1);
    interiorGroup.add(aisleFloor);

    const aisleLightL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 4.5), new THREE.MeshBasicMaterial({ color: 0x06b6d4 }));
    aisleLightL.position.set(-0.25, 0.45, -0.1);
    interiorGroup.add(aisleLightL);

    const aisleLightR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 4.5), new THREE.MeshBasicMaterial({ color: 0x06b6d4 }));
    aisleLightR.position.set(0.25, 0.45, -0.1);
    interiorGroup.add(aisleLightR);

    // Left Luxury AC Sleeper Berth #L4 (Passenger Position)
    const berthL = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.18, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 })
    );
    berthL.position.set(-0.52, 0.58, 0.3);
    interiorGroup.add(berthL);

    const mattressL = new THREE.Mesh(
      new THREE.BoxGeometry(0.60, 0.10, 1.7),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.7 })
    );
    mattressL.position.set(-0.52, 0.69, 0.3);
    interiorGroup.add(mattressL);

    const pillowL = new THREE.Mesh(
      new THREE.BoxGeometry(0.52, 0.09, 0.28),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 })
    );
    pillowL.position.set(-0.52, 0.76, -0.42);
    interiorGroup.add(pillowL);

    const blanketL = new THREE.Mesh(
      new THREE.BoxGeometry(0.58, 0.08, 0.95),
      new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.75 })
    );
    blanketL.position.set(-0.52, 0.76, 0.55);
    interiorGroup.add(blanketL);

    // Reading Lamp with Warm Point Light
    const cabinWarmLight = new THREE.PointLight(0xffedd5, 1.8, 3.2);
    cabinWarmLight.position.set(-0.72, 1.32, -0.1);
    interiorGroup.add(cabinWarmLight);

    // Personal Entertainment Screen
    const tvScreen = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, 0.28, 0.42),
      new THREE.MeshBasicMaterial({ color: 0x0284c7 })
    );
    tvScreen.position.set(-0.80, 1.25, 0.85);
    interiorGroup.add(tvScreen);

    // Right Berths (Upper & Lower Sleeper Bunks)
    const berthR = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.18, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 })
    );
    berthR.position.set(0.52, 0.58, 0.3);
    interiorGroup.add(berthR);

    const mattressR = new THREE.Mesh(
      new THREE.BoxGeometry(0.60, 0.10, 1.7),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.7 })
    );
    mattressR.position.set(0.52, 0.69, 0.3);
    interiorGroup.add(mattressR);

    // Royal Amber Velvet Privacy Curtain
    const curtainR = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.95, 0.65),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.85 })
    );
    curtainR.position.set(0.24, 1.15, -0.3);
    interiorGroup.add(curtainR);

    // REAR INTERIOR (For 360° Looking Behind)
    // Rear Berths L1 & R1
    const rearBerthL = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.18, 1.6),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 })
    );
    rearBerthL.position.set(-0.52, 0.58, -1.5);
    interiorGroup.add(rearBerthL);

    const rearMattressL = new THREE.Mesh(
      new THREE.BoxGeometry(0.60, 0.10, 1.5),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.7 })
    );
    rearMattressL.position.set(-0.52, 0.69, -1.5);
    interiorGroup.add(rearMattressL);

    const rearBerthR = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.18, 1.6),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 })
    );
    rearBerthR.position.set(0.52, 0.58, -1.5);
    interiorGroup.add(rearBerthR);

    // Rear Emergency Exit Door & Glowing Green Sign
    const rearExitSign = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.12, 0.04),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    rearExitSign.position.set(0, 1.72, -bodyLength / 2 + 0.1);
    interiorGroup.add(rearExitSign);

    // FRONT COCKPIT (Dashboard, Steering Wheel, Speedometer)
    const dashboard = new THREE.Mesh(
      new THREE.BoxGeometry(1.58, 0.38, 0.65),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 })
    );
    dashboard.position.set(0, 0.75, bodyLength / 2 - 0.2);
    interiorGroup.add(dashboard);

    const speedometer = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.14, 0.02),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    speedometer.position.set(-0.42, 0.96, bodyLength / 2 - 0.35);
    interiorGroup.add(speedometer);

    const steeringWheel = new THREE.Mesh(
      new THREE.TorusGeometry(0.2, 0.035, 8, 24),
      new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.5 })
    );
    steeringWheel.rotation.x = Math.PI / 3;
    steeringWheel.position.set(-0.42, 0.98, bodyLength / 2 - 0.5);
    interiorGroup.add(steeringWheel);

    const driverSeat = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.75, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 })
    );
    driverSeat.position.set(-0.42, 0.82, bodyLength / 2 - 0.95);
    interiorGroup.add(driverSeat);

    // Ceiling Ambient Starlight LED Strip
    const ceilingLightStrip = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.02, 4.4),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    ceilingLightStrip.position.set(0, 1.82, -0.1);
    interiorGroup.add(ceilingLightStrip);

    busGroup.add(interiorGroup);

    // Front Headlights
    const hlGeo = new THREE.BoxGeometry(0.32, 0.14, 0.08);
    const hlMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const hlL = new THREE.Mesh(hlGeo, hlMat);
    hlL.position.set(-0.62, 0.68, bodyLength / 2 + 0.26);
    busGroup.add(hlL);

    const hlR = new THREE.Mesh(hlGeo, hlMat);
    hlR.position.set(0.62, 0.68, bodyLength / 2 + 0.26);
    busGroup.add(hlR);

    // Volumetric Headlight Beams
    const beamGeo = new THREE.ConeGeometry(1.4, 9, 24, 1, true);
    beamGeo.rotateX(-Math.PI / 2);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xdbeafe,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide
    });

    const beamL = new THREE.Mesh(beamGeo, beamMat);
    beamL.position.set(-0.62, 0.68, bodyLength / 2 + 4.8);
    busGroup.add(beamL);

    const beamR = new THREE.Mesh(beamGeo, beamMat);
    beamR.position.set(0.62, 0.68, bodyLength / 2 + 4.8);
    busGroup.add(beamR);

    // Real Spotlights
    const spotL = new THREE.SpotLight(0xffffff, 5, 20, Math.PI / 8, 0.4);
    spotL.position.set(-0.62, 0.7, bodyLength / 2 + 0.3);
    spotL.target.position.set(-0.62, 0, 14);
    scene.add(spotL);
    scene.add(spotL.target);

    const spotR = new THREE.SpotLight(0xffffff, 5, 20, Math.PI / 8, 0.4);
    spotR.position.set(0.62, 0.7, bodyLength / 2 + 0.3);
    spotR.target.position.set(0.62, 0, 14);
    scene.add(spotR);
    scene.add(spotR.target);

    // Rear Neon Tail Lights & Trails
    const tlL = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.14, 0.08), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    tlL.position.set(-0.62, 0.8, -bodyLength / 2 - 0.02);
    busGroup.add(tlL);

    const tlR = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.14, 0.08), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    tlR.position.set(0.62, 0.8, -bodyLength / 2 - 0.02);
    busGroup.add(tlR);

    const trailGeo = new THREE.PlaneGeometry(0.08, 5.5);
    const trailMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.35, side: THREE.DoubleSide });

    const trailL = new THREE.Mesh(trailGeo, trailMat);
    trailL.rotation.x = Math.PI / 2;
    trailL.position.set(-0.62, 0.8, -bodyLength / 2 - 2.8);
    busGroup.add(trailL);

    const trailR = new THREE.Mesh(trailGeo, trailMat);
    trailR.rotation.x = Math.PI / 2;
    trailR.position.set(0.62, 0.8, -bodyLength / 2 - 2.8);
    busGroup.add(trailR);

    // 6 Wheels
    const wheels = [];
    const tireGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 20);
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x050810, roughness: 0.9 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.95, roughness: 0.08 });
    const caliperMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

    const wheelCoordinates = [
      [-bodyWidth / 2 - 0.05, 0.38, 1.45],
      [bodyWidth / 2 + 0.05, 0.38, 1.45],
      [-bodyWidth / 2 - 0.05, 0.38, -1.0],
      [bodyWidth / 2 + 0.05, 0.38, -1.0],
      [-bodyWidth / 2 - 0.05, 0.38, -1.82],
      [bodyWidth / 2 + 0.05, 0.38, -1.82]
    ];

    wheelCoordinates.forEach(([x, y, z]) => {
      const wGroup = new THREE.Group();
      wGroup.position.set(x, y, z);
      wGroup.rotation.z = Math.PI / 2;

      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.castShadow = true;
      wGroup.add(tire);

      const alloyWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.3, 10), rimMat);
      wGroup.add(alloyWheel);

      const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.31, 0.16), caliperMat);
      caliper.position.set(0, 0, 0.14);
      wGroup.add(caliper);

      busGroup.add(wGroup);
      wheels.push(wGroup);
    });

    // Aerodynamic Side Mirrors
    const mirrorMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.3 });
    const mirrorL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.32, 0.18), mirrorMat);
    mirrorL.position.set(-bodyWidth / 2 - 0.2, 1.35, bodyLength / 2 - 0.2);
    busGroup.add(mirrorL);

    const mirrorR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.32, 0.18), mirrorMat);
    mirrorR.position.set(bodyWidth / 2 + 0.2, 1.35, bodyLength / 2 - 0.2);
    busGroup.add(mirrorR);

    scene.add(busGroup);

    // =========================================================================
    // 6. TRUE 360-DEGREE INTERACTIVE ORBITAL & PANORAMIC CONTROLS
    // =========================================================================
    let isPointerDown = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    const onPointerDown = (e) => {
      isPointerDown = true;
      prevPointerX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      prevPointerY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    };

    const onPointerMove = (e) => {
      if (!isPointerDown) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      const deltaX = clientX - prevPointerX;
      const deltaY = clientY - prevPointerY;
      prevPointerX = clientX;
      prevPointerY = clientY;

      const state = controlsStateRef.current;

      if (state.isInterior) {
        // Full 360° Interior Panoramic First-Person Look (Yaw & Pitch)
        state.interiorYaw -= deltaX * 0.006; // Full continuous 360° rotation!
        state.interiorPitch -= deltaY * 0.005;
        // Limit vertical pitch to avoid flipping over
        state.interiorPitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, state.interiorPitch));
      } else {
        // Full 360° Exterior Orbital Rotation around the Coach
        state.theta -= deltaX * 0.008; // Orbit 360° horizontally around the bus
        state.phi -= deltaY * 0.006;
        // Clamp vertical angle so camera stays above the highway surface
        state.phi = Math.max(0.2, Math.min(Math.PI / 2 - 0.02, state.phi));
      }
    };

    const onPointerUp = () => {
      isPointerDown = false;
    };

    // Mouse wheel zoom for exterior
    const onWheel = (e) => {
      const state = controlsStateRef.current;
      if (!state.isInterior) {
        state.radius += e.deltaY * 0.004;
        state.radius = Math.max(3.8, Math.min(12.0, state.radius));
      }
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: true });

    // =========================================================================
    // 7. RENDER & PHYSICS LOOP
    // =========================================================================
    let startTime = performance.now();
    let animFrameId;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;
      const state = controlsStateRef.current;

      // 1. Moving Highway Stripes & Cat's Eyes (80 km/h)
      stripes.forEach(s => {
        s.position.z += 0.42;
        if (s.position.z > 8) s.position.z = -45;
      });

      catEyes.forEach(c => {
        c.position.z += 0.42;
        if (c.position.z > 8) c.position.z = -45;
      });

      // 2. Moving Highway Gantry & Light Poles
      gantryGroup.position.z += 0.38;
      if (gantryGroup.position.z > 14) gantryGroup.position.z = -60;

      lightPoles.forEach(p => {
        p.position.z += 0.42;
        if (p.position.z > 14) p.position.z = -65;
      });

      // 3. Spin All 6 Wheels
      wheels.forEach(w => {
        w.rotation.x += 0.35;
      });

      // 4. Subtle Highway Suspension Dynamics
      busGroup.position.y = Math.sin(elapsed * 6.5) * 0.032;
      busGroup.rotation.z = Math.sin(elapsed * 2.8) * 0.012;
      busGroup.rotation.y = Math.sin(elapsed * 1.4) * 0.018;

      // 5. Dynamic Underglow Breathing Pulse
      underglowCyan.intensity = 3.5 + Math.sin(elapsed * 4) * 1.5;
      underglowMagenta.intensity = 2.5 + Math.cos(elapsed * 3) * 1.2;

      // 6. Camera Position & Look Target Calculations (Exterior 360 vs Interior 360)
      if (state.isInterior) {
        // Auto slow pan if idle and auto-rotate enabled
        if (state.autoRotate && !isPointerDown) {
          state.interiorYaw += 0.002;
        }

        // Camera stays anchored inside berth #L4
        const targetCamPos = state.interiorCamPos;
        camera.position.lerp(targetCamPos, 0.08);

        // Compute 360° spherical look vector from interiorYaw & interiorPitch
        const lookDirX = Math.sin(state.interiorYaw) * Math.cos(state.interiorPitch);
        const lookDirY = Math.sin(state.interiorPitch);
        const lookDirZ = Math.cos(state.interiorYaw) * Math.cos(state.interiorPitch);

        const targetLook = new THREE.Vector3(
          camera.position.x + lookDirX * 5,
          camera.position.y + lookDirY * 5,
          camera.position.z + lookDirZ * 5
        );
        camera.lookAt(targetLook);
      } else {
        // Auto slow orbit around exterior if autoRotate is enabled and not manually dragging
        if (state.autoRotate && !isPointerDown) {
          state.theta += 0.003; // Smooth continuous 360° spin!
        }

        // Compute exterior spherical position around the coach center (0, 0.95, 0.2)
        const targetX = state.radius * Math.sin(state.phi) * Math.sin(state.theta);
        const targetY = state.radius * Math.cos(state.phi) + 0.6;
        const targetZ = state.radius * Math.sin(state.phi) * Math.cos(state.theta);

        const targetPos = new THREE.Vector3(targetX, targetY, targetZ);
        camera.position.lerp(targetPos, 0.06);

        camera.lookAt(0, 0.95, 0.2);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 460;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(animFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="bus-3d-hero-container">
      {/* Three.js 3D Canvas Mount */}
      <div ref={mountRef} className="threejs-canvas-stage"></div>

      {/* 360° Interactive Drag Prompt */}
      <div className="interactive-360-hint">
        <Move size={14} className="text-accent animate-pulse" />
        <span>Click & Drag anywhere for 360° view</span>
      </div>

      {/* Camera Angle Switcher Controls */}
      <div className="camera-presets-bar">
        <span className="cam-bar-label">
          <Camera size={14} className="text-accent" /> 360° Views:
        </span>
        <button 
          className={`cam-preset-btn ${activeCamPreset === 'interior' ? 'active interior-active' : ''}`}
          onClick={() => setCameraPreset('interior')}
          title="Step inside for full 360° interior panoramic look"
        >
          <BedDouble size={14} className="text-warning" />
          <span>360° Inside Cabin</span>
        </button>
        <button 
          className={`cam-preset-btn ${activeCamPreset === 'cinematic' ? 'active' : ''}`}
          onClick={() => setCameraPreset('cinematic')}
          title="360° Exterior Orbital View"
        >
          <Sparkles size={13} />
          <span>Cinematic 3/4</span>
        </button>
        <button 
          className={`cam-preset-btn ${activeCamPreset === 'chase' ? 'active' : ''}`}
          onClick={() => setCameraPreset('chase')}
        >
          <Eye size={13} />
          <span>Chaser Cam</span>
        </button>
        <button 
          className={`cam-preset-btn ${activeCamPreset === 'side' ? 'active' : ''}`}
          onClick={() => setCameraPreset('side')}
        >
          <span>Side Cruiser</span>
        </button>
        <button 
          className={`cam-preset-btn ${activeCamPreset === 'front' ? 'active' : ''}`}
          onClick={() => setCameraPreset('front')}
        >
          <span>Highway Front</span>
        </button>

        {/* 360° Auto-Rotate Toggle Button */}
        <button 
          className={`cam-preset-btn btn-auto-spin ${autoRotate ? 'active' : ''}`}
          onClick={toggleAutoRotate}
          title={autoRotate ? 'Pause 360° Auto-Spin' : 'Resume 360° Auto-Spin'}
        >
          <RotateCw size={13} className={autoRotate ? 'spinning-icon' : ''} />
          <span>{autoRotate ? '360° Spin On' : '360° Spin Off'}</span>
        </button>
      </div>

      {/* Dynamic HUD Overlay: Interior Cabin vs Exterior */}
      {activeCamPreset === 'interior' ? (
        <div className="hero-3d-floating-overlay interior-hud">
          <div className="badge-3d badge-berth">
            <BedDouble size={14} className="text-warning" />
            <span>360° Luxury Sleeper Berth #L4</span>
          </div>

          <div className="badge-3d badge-temp">
            <Thermometer size={14} className="text-cyan" />
            <span>Cabin Climate: 21.5°C Auto AC</span>
          </div>

          <div className="badge-3d badge-wifi">
            <Wifi size={14} className="text-success" />
            <span>High-Speed 5G WiFi Active</span>
          </div>
        </div>
      ) : (
        <div className="hero-3d-floating-overlay">
          <div className="badge-3d badge-speed">
            <Zap size={14} className="text-cyan animate-pulse" />
            <span>80 km/h Highway Cruise</span>
          </div>

          <div className="badge-3d badge-route">
            <Compass size={14} className="text-warning" />
            <span>NH 44 • Bangalore ➔ Hyderabad</span>
          </div>

          <div className="badge-3d badge-rating">
            <ShieldCheck size={14} className="text-success" />
            <span>Volvo B11R Multi-Axle I-Shift</span>
          </div>
        </div>
      )}
    </div>
  );
}
