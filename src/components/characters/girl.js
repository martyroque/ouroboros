import React, { Component } from 'react';
import { Body, Sprite } from 'react-game-kit';
import PropTypes from 'prop-types';
import Matter from 'matter-js';

class Girl extends Component {
  static propTypes = {
    keys: PropTypes.object
  };

  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number
  };

  state = {
    characterState: 0,
    loop: false,
    spritePlaying: true,
    repeat: false,
    position: {
      x: 0,
      y: 0
    }
  };

  loopID = null;
  lastX = 0;
  lastY = 0;

  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }

  handlePlayStateChanged = (state) => {
    this.setState({
      spritePlaying: state ? true : false
    });
  };

  setCharacterPosition(position) {
    this.setState({
      position
    });
  }

  update = () => {
    const { body } = this.body;
    const { x, y } = body.position;

    this.checkKeys();
    this.setCharacterPosition(body.position);

    Matter.Body.set(body, 'friction', 1);

    this.lastX = x;
    this.lastY = y;
  };

  checkKeys() {
    const { keys } = this.props;
    const { body } = this.body;
    let characterState = 0;

    if (keys.isDown(keys.LEFT)) {
      this.move(body, -1, 0);
      characterState = 2;
    } else if (keys.isDown(keys.RIGHT)) {
      this.move(body, 1, 0);
      characterState = 3;
    } else if (keys.isDown(keys.UP)) {
      this.move(body, 0, -1);
      characterState = 4;
    } else if (keys.isDown(keys.DOWN)) {
      this.move(body, 0, 1);
      characterState = 1;
    }

    this.setState({
      characterState,
      repeat: characterState !== 0
    });
  }

  move(body, x, y) {
    Matter.Body.setVelocity(body, { x, y });
  }

  getWrapperStyles() {
    const { scale } = this.context;
    const { x, y } = this.state.position;

    return {
      position: 'absolute',
      transform: `translate(${x}px, ${y}px)`,
      transformOrigin: 'left top',
    };
  }

  render() {
    //const { x, y } = this.state.position;

    return (
      <div style={this.getWrapperStyles()}>
        <Body
          args={[0, 0, 64, 50, { inertia: Infinity }]}
          ref={(b) => { this.body = b; }}
        >
          <Sprite
            repeat={this.state.repeat}
            onPlayStateChanged={this.handlePlayStateChanged}
            src="assets/girl.png"
            scale={this.context.scale}
            state={this.state.characterState}
            steps={[0, 7, 7, 7, 7]}
            tileHeight={64}
            tileWidth={50}
            offset={[0, 4]}
          />
        </Body>
      </div>
    );
  }
}

export default Girl;