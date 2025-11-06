"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0.1)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 5

    // Create animated particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 100
    const positionArray = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positionArray[i] = (Math.random() - 0.5) * 20
      positionArray[i + 1] = (Math.random() - 0.5) * 20
      positionArray[i + 2] = (Math.random() - 0.5) * 20
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x4a90e2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Create rotating cube
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x2e5bba,
      wireframe: true,
      emissive: 0x4a90e2,
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.z = -3
    scene.add(cube)

    // Lighting
    const light = new THREE.PointLight(0x4a90e2, 1)
    light.position.set(5, 5, 5)
    scene.add(light)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      particles.rotation.x += 0.0001
      particles.rotation.y += 0.0002
      cube.rotation.x += 0.003
      cube.rotation.y += 0.005

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-10 opacity-30" style={{ pointerEvents: "none" }} />
}
