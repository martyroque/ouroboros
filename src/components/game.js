import React, { Component } from 'react';
import { Loop, Stage, World, KeyListener } from 'react-game-kit';
import Matter from 'matter-js';

import Girl from './characters/girl';

class Game extends Component {
  state = {};
  keyListener = new KeyListener();

  componentDidMount() {
    this.keyListener.subscribe([
      this.keyListener.LEFT,
      this.keyListener.RIGHT,
      this.keyListener.UP,
      this.keyListener.DOWN
    ]);
  }

  componentWillUnmount() {
    this.keyListener.unsubscribe();
  }

  physicsInit(engine) {
    const ground = Matter.Bodies.rectangle(
      512, 448,
      64, 64,
      {
        isStatic: true
      }
    );

    const rightWall = Matter.Bodies.rectangle(3008, 288, 64, 576, {
      isStatic: true
    });

    Matter.World.addBody(engine.world, ground);
    Matter.World.addBody(engine.world, rightWall);
  }
  
  render() {
    return (
      <Loop>
        <Stage style={{ background: '#747136' }}>
          <World 
            onInit={this.physicsInit} 
            gravity={{
              x: 0,
              y: 0,
              scale: 0.01,
            }}
          >
            <Girl keys={this.keyListener} />
          </World>
        </Stage>
      </Loop>
    );
  }
}

export default Game;