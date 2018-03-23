import React, { Component } from 'react';
import { World } from 'react-game-kit';

class OBWorld extends Component {
  physicsInit = (engine) => {
    const ground = Matter.Bodies.rectangle(
      512, 448,
      1024, 64,
      {
        isStatic: true,
      },
    );

    Matter.World.addBody(engine.world, ground);
  }
  
  render() {
    return <World onInit={this.physicsInit}/>;
  }
}

export default OBWorld;