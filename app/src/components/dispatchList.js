import React from 'react';
import { connect } from 'react-redux';
import { fetch } from './../actions/box';

import {
  FETCH_BOXES_REQUEST
} from './../constants/actionTypes';

import './dispatchList.scss';

const mapStateToProps = state => ({
  boxes: state.box.boxes
});

const mapDispatchToProps = dispatch => ({
  onFetchBoxesRequest: () => {
    dispatch({type: FETCH_BOXES_REQUEST});
  },
  onFetchBoxes: () => {
    dispatch(fetch());
  }
});

class DispatchList extends React.Component {

  componentDidMount() {
    this.props.onFetchBoxesRequest();
    this.props.onFetchBoxes();
  }

  render = () => {
    let boxes;

    if(this.props.boxes !== undefined && this.props.boxes.length > 0) {
      boxes = this.props.boxes.map(box =>
        (
          <tr key={box.id}>
            <td>{box.name}</td>
            <td>{box.weight}</td>
            <td style={{backgroundColor: box.color}}></td>
            <td>{box.cost}</td>
          </tr>
        )
      )
    } else {
      boxes = <tr></tr>
    }


    return (
      <table>
        <thead>
          <tr>
            <th>Receiver</th>
            <th>Weight</th>
            <th>Box Color</th>
            <th>Shipping Cost</th>
          </tr>
        </thead>
        <tbody>
          { boxes }
        </tbody>
      </table>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DispatchList);
