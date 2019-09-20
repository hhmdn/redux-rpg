import * as React from 'react';
import * as style from './style.css';

import { CONSTANTS } from 'app/constants';


type MyProps = { tileValue: number, key: number, keyValue: number };

export class Tile extends React.Component <MyProps>{
  render() {
    let styleClass = style.tiles;
    let yPosition = Math.floor(this.props.tileValue / CONSTANTS.BIT_NUM_PER_ROW);
    let xPosition = this.props.tileValue - (yPosition *  CONSTANTS.BIT_NUM_PER_ROW) + 1;

    const pStyle = {
      backgroundPositionX: 'right ' + (xPosition * CONSTANTS.BIT_SIZE) + 'px',
      backgroundPositionY: 'bottom ' + ((yPosition + 1) * CONSTANTS.BIT_SIZE) + 'px',
    };
    return (
      <div data-value={this.props.keyValue} className={styleClass} style={pStyle}></div>
    );
  }
}

export default Tile;
