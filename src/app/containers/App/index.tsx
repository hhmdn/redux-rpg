import * as React from 'react';
import * as style from './style.css';
import { TileSet } from 'app/components';
import { RootState } from 'app/reducers';
import { LocationActions } from 'app/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { omit } from 'app/utils';

export namespace App {
  export interface Props {
    locationState: RootState.LocationState;
    actions: LocationActions;
  }
}

@connect(
  (state: RootState, ownProps): Pick<App.Props, any> => {
  	return { locationState: state.locationState };
  },
  (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(LocationActions, 'Type'), dispatch)
  })
)

export class App extends React.Component<App.Props> {
  constructor(props: App.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <div className={style.game}>
        <TileSet 
        	locationState={this.props.locationState}
        	actions={this.props.actions}
       	/>
      </div>
    );
  }
}
