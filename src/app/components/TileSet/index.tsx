import * as React from 'react';
import * as style from './style.css';
import { Tile, Protagonist } from 'app/components';
import { LocationActions } from 'app/actions';
import { RootState } from 'app/reducers'
import { WORLD_ONE } from 'app/worlds';
import { CONSTANTS } from 'app/constants';

var tiles: any[];
var overlayTiles: any[];
var keyState: any[];

export namespace TileSet{
  export interface Props {
    locationState: RootState.LocationState;
    actions: LocationActions;
  }
  export interface State {
    tilesLoaded: boolean,
    lastUpdateDate: Date,
  }
}

export class TileSet extends React.Component<TileSet.Props, TileSet.State> {
  constructor(props: any) {
    super(props);
    this.state = { tilesLoaded: false, lastUpdateDate : new Date() };
    tiles = [];
    overlayTiles = [];
    keyState = [];
    this.render = this.render.bind(this);
    this.loadTiles = this.loadTiles.bind(this);
    this.isCollisionAhead = this.isCollisionAhead.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.scrollAhead = this.scrollAhead.bind(this);
    this.renderDirectionSpriteStyles = this.renderDirectionSpriteStyles.bind(this);
  }

  componentDidMount() {
    this.gameLoop();
  }

  calcTilePosition() {
    let posX = this.props.locationState.posX;
    let posY = this.props.locationState.posY;
    let x = (posX) / CONSTANTS.BIT_SIZE; 
    let y = (posY) / CONSTANTS.BIT_SIZE;
    let sum = ((y * CONSTANTS.SQUARES_PER_ROW) + x);
    return Math.round(sum);
  }

  isTileAheadBlocking(tilePosition: number, eventCode: number) {
    switch (eventCode) {
      case CONSTANTS.KEY_ARROW_UP:
          return this.isTileGrainBlocking((tilePosition - CONSTANTS.SQUARES_PER_ROW));
      case CONSTANTS.KEY_ARROW_DOWN:
          return this.isTileGrainBlocking((tilePosition + CONSTANTS.SQUARES_PER_ROW));    
      case CONSTANTS.KEY_ARROW_LEFT:
          return this.isTileGrainBlocking((tilePosition - 1)); 
      case CONSTANTS.KEY_ARROW_RIGHT:
          return this.isTileGrainBlocking((tilePosition + 1)); 
      default:
          return false
    }
  }

  isTileGrainBlocking(tile: number) {
    return WORLD_ONE[1][tile] !== 1;
  }

  scrollAhead() {
    let BitsPerSquareByTwo = CONSTANTS.BIT_SIZE / 2;

    let currentTileViewX = -(this.props.locationState.backgroundX / CONSTANTS.BACKGROUND_POS_MAX);
    let currentTileViewY = -(this.props.locationState.backgroundY / CONSTANTS.BACKGROUND_POS_MAX);

    let x = this.props.locationState.posX / BitsPerSquareByTwo; // 40
    let y = this.props.locationState.posY / BitsPerSquareByTwo; // 0


    if (currentTileViewX === 0) {
      if (x > CONSTANTS.SQUARES_PER_ROW) {
        this.props.actions.scrollRight();
      }
    }
    else if (x > (currentTileViewX + 1) * CONSTANTS.SQUARES_PER_ROW) {
      this.props.actions.scrollRight();
    }
    else if (x < (currentTileViewX) * CONSTANTS.SQUARES_PER_ROW) {
      this.props.actions.scrollLeft();
    }

    if (currentTileViewY === 0) {
      if (y > CONSTANTS.SQUARES_PER_ROW) {
        this.props.actions.scrollDown();
      }
    }
    else if (y > (currentTileViewY + 1) * CONSTANTS.SQUARES_PER_ROW) {
      this.props.actions.scrollDown();
    }
    else if (y < (currentTileViewY) * CONSTANTS.SQUARES_PER_ROW) {
      this.props.actions.scrollUp();
    }

  }


  handleKeyDown(event: any) {
    keyState[event.keyCode] = true;
  }

  handleKeyUp(event: any) {
    keyState[event.keyCode] = true;
  }



gameLoop() {
    if (keyState[CONSTANTS.KEY_ARROW_UP]) {
      // up arrow
      if (!this.isCollisionAhead(CONSTANTS.KEY_ARROW_UP)) {
        this.props.actions.moveUp();
      }
      this.props.actions.updateDirection(CONSTANTS.KEY_ARROW_UP);
    }
    else if (keyState[CONSTANTS.KEY_ARROW_DOWN]) {
        // down arrow
      if (!this.isCollisionAhead(CONSTANTS.KEY_ARROW_DOWN)) {
        this.props.actions.moveDown();
      }
      this.props.actions.updateDirection(CONSTANTS.KEY_ARROW_DOWN);
    }
    else if (keyState[CONSTANTS.KEY_ARROW_LEFT]) {
       // left arrow
      if (!this.isCollisionAhead(CONSTANTS.KEY_ARROW_LEFT)) {
        this.props.actions.moveLeft();
      } 
      this.props.actions.updateDirection(CONSTANTS.KEY_ARROW_LEFT);
    }
    else if (keyState[CONSTANTS.KEY_ARROW_RIGHT]) {
       // right arrow
      if (!this.isCollisionAhead(CONSTANTS.KEY_ARROW_RIGHT)) {
        this.props.actions.moveRight();
      }
      this.props.actions.updateDirection(CONSTANTS.KEY_ARROW_RIGHT);
    }
    else if (keyState.length === 0) {
      this.props.actions.updateDirection(0);
    }
    keyState =  [];
    this.scrollAhead();
    setTimeout(this.gameLoop, 100);
}


  isCollisionAhead(keyCode: number) {
    if (this.isTileAheadBlocking(this.calcTilePosition(), keyCode)) {
      return true;
    }
    if (this.props.locationState.posY < (CONSTANTS.BIT_SIZE / 2) && keyCode === CONSTANTS.KEY_ARROW_UP) {
      return true;
    }
    if (this.props.locationState.posY > CONSTANTS.LEVEL_BOUNDARY && keyCode === CONSTANTS.KEY_ARROW_DOWN) {
      return true;
    }
    if (this.props.locationState.posX < (CONSTANTS.BIT_SIZE / 2) && keyCode === CONSTANTS.KEY_ARROW_LEFT) {
      return true;
    }
    if (this.props.locationState.posX > CONSTANTS.LEVEL_BOUNDARY && keyCode === CONSTANTS.KEY_ARROW_RIGHT) {
      return true;
    }
    return false;
  }



  loadTiles() {
    for (var i = 0; i < WORLD_ONE[0].length; i++) {
      tiles.push(<Tile key={i} keyValue={i} tileValue={WORLD_ONE[0][i]} />);
      overlayTiles.push(<Tile key={i} keyValue={i} tileValue={WORLD_ONE[1][i]} />);
    }
  }

  renderDirectionSpriteStyles() {

    switch (this.props.locationState.directionFacing) {
      case CONSTANTS.DIRECTION_FRONT_RIGHT:
          return style.character + ' ' + style.frontRight;
      case CONSTANTS.DIRECTION_FRONT_STAND:
          return style.character + ' ' + style.frontStand;
      case CONSTANTS.DIRECTION_FRONT_LEFT:
          return style.character + ' ' + style.frontLeft;    
      case CONSTANTS.DIRECTION_BACK_RIGHT:
          return style.character + ' ' + style.backRight;
      case CONSTANTS.DIRECTION_BACK_STAND:
          return style.character + ' ' + style.backStand;
      case CONSTANTS.DIRECTION_BACK_LEFT:
          return style.character + ' ' + style.backLeft;  
      case CONSTANTS.DIRECTION_LEFT_RIGHT:
          return style.character + ' ' + style.leftRight;
      case CONSTANTS.DIRECTION_LEFT_STAND:
          return style.character + ' ' + style.leftStand;
      case CONSTANTS.DIRECTION_LEFT_LEFT:
          return style.character + ' ' + style.leftLeft;         
      case CONSTANTS.DIRECTION_RIGHT_RIGHT:
          return style.character + ' ' + style.rightRight;
      case CONSTANTS.DIRECTION_RIGHT_STAND:
          return style.character + ' ' + style.rightStand;
      case CONSTANTS.DIRECTION_RIGHT_LEFT:
          return style.character + ' ' + style.rightLeft;   

      default:
          return style.character;
    }
  }

  render() {
    if (!this.state.tilesLoaded) {
      this.loadTiles();
      this.setState({ tilesLoaded: true });
    }

    let charStyles = this.renderDirectionSpriteStyles();

    return (
      <div className={style.game}>
        <div 
          className={style.tileset} 
          style={{
            margin: `${this.props.locationState.backgroundY}px 0 0 ${this.props.locationState.backgroundX}px`
          }}
        >
          {tiles}
          <div 
            className={charStyles}
            style={{
              transform: `translate(${this.props.locationState.posX}px, ${this.props.locationState.posY}px)` 
            }}
          >
            <Protagonist />
          </div>
        </div>
         <div 
          className={style.overlayWindow} 
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          tabIndex={1}
        >
            <div 
              className={style.overlay}
              style={{
                margin: `${this.props.locationState.backgroundY}px 0 0 ${this.props.locationState.backgroundX}px`
              }}
            >
              {overlayTiles}
            </div>
        </div>
      </div>
    );
  }
}
  