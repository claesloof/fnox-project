import React from 'react';
import { connect } from 'react-redux';
import { fetch } from './../actions/box';

import './dispatchList.scss';

const mapStateToProps = state => ({
  boxes: state.box.boxes
});

const mapDispatchToProps = dispatch => ({
  onFetchBoxes: () => {
    dispatch(fetch());
  }
});

export class DispatchList extends React.Component {

  componentDidMount() {
    this.props.onFetchBoxes();
  }

  render = () => {
    let boxes;

    if(this.props.boxes !== undefined && this.props.boxes.length > 0) {
      boxes = this.props.boxes.map(box =>
        (
          <tr className="box-table__item" key={box.id}>
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
      <table className="box-table">
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
