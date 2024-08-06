import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const MatterCanvas = () => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const renderRef = useRef(null);

  useEffect(() => {
    Matter.use('matter-attractors');
    Matter.use('matter-wrap');

    const Engine = Matter.Engine;
    const Events = Matter.Events;
    const Runner = Matter.Runner;
    const Render = Matter.Render;
    const World = Matter.World;
    const Body = Matter.Body;
    const Mouse = Matter.Mouse;
    const Common = Matter.Common;
    const Bodies = Matter.Bodies;

    const dimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const engine = Engine.create();
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;
    engine.world.gravity.scale = 0.1;

    const render = Render.create({
      element: canvasRef.current,
      engine: engine,
      options: {
        showVelocity: false,
        width: dimensions.width,
        height: dimensions.height,
        wireframes: false,
        background: 'transparent',
      },
    });

    const runner = Runner.create();

    const world = engine.world;
    world.gravity.scale = 0;

    const attractiveBody = Bodies.circle(
      render.options.width / 2,
      render.options.height / 2,
      Math.max(dimensions.width / 25, dimensions.height / 25) / 2,
      {
        render: {
          fillStyle: '#000',
          strokeStyle: '#000',
          lineWidth: 0,
        },
        isStatic: true,
        plugin: {
          attractors: [
            function (bodyA, bodyB) {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                y: (bodyA.position.y - bodyB.position.y) * 1e-6,
              };
            },
          ],
        },
      }
    );

    World.add(world, attractiveBody);

    for (let i = 0; i < 60; i += 1) {
      const x = Common.random(0, render.options.width);
      const y = Common.random(0, render.options.height);
      const s = Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
      const polygonNumber = Common.random(3, 6);

      const body = Bodies.polygon(
        x,
        y,
        polygonNumber,
        s,
        {
          mass: s / 20,
          friction: 0,
          frictionAir: 0.02,
          angle: Math.round(Math.random() * 360),
          render: {
            fillStyle: '#222222',
            strokeStyle: '#000000',
            lineWidth: 2,
          },
        }
      );

      World.add(world, body);

      const r = Common.random(0, 1);

      const circle1 = Bodies.circle(x, y, Common.random(2, 8), {
        mass: 0.1,
        friction: 0,
        frictionAir: 0.01,
        render: {
          fillStyle: r > 0.3 ? '#27292d' : '#444444',
          strokeStyle: '#000000',
          lineWidth: 2,
        },
      });

      World.add(world, circle1);

      const circle2 = Bodies.circle(x, y, Common.random(2, 20), {
        mass: 6,
        friction: 0,
        frictionAir: 0,
        render: {
          fillStyle: r > 0.3 ? '#334443' : '#222222',
          strokeStyle: '#111111',
          lineWidth: 4,
        },
      });

      World.add(world, circle2);

      const circle3 = Bodies.circle(x, y, Common.random(2, 30), {
        mass: 0.2,
        friction: 0.6,
        frictionAir: 0.8,
        render: {
          fillStyle: '#191919',
          strokeStyle: '#111111',
          lineWidth: 3,
        },
      });

      World.add(world, circle3);
    }

    const mouse = Mouse.create(render.canvas);

    Events.on(engine, "afterUpdate", function () {
      if (!mouse.position.x) return;
      // smoothly move the attractor body towards the mouse
      Body.translate(attractiveBody, {
        x: (mouse.position.x - attractiveBody.position.x) * 0.12,
        y: (mouse.position.y - attractiveBody.position.y) * 0.12,
      });
    });
  


    Runner.run(runner, engine);
    Render.run(render);

    engineRef.current = engine;
    runnerRef.current = runner;
    renderRef.current = render;

    return () => {
      Render.stop(render);
      Runner.stop(runner);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const dimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      if (renderRef.current) {
        renderRef.current.canvas.width = dimensions.width;
        renderRef.current.canvas.height = dimensions.height;
        Render.setSize(renderRef.current, dimensions.width, dimensions.height);
      }
    };

    const debounce = (func, wait) => {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    window.addEventListener('resize', debounce(handleResize, 250));


    

    return () => {
      window.removeEventListener('resize', debounce(handleResize, 250));
    };
  }, []);

  return <div ref={canvasRef} 
  className='max-w-screen-xl w-full mx-auto px-2 mt-2'
  
  style={{ width: '100%', height: '100%', position: 'absolute' }}></div>;
};

export default MatterCanvas;