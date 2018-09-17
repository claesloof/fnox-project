import React from 'react';

const destinations = ["Sweden", "China", "Brazil", "Australia"];

class AddBox extends React.Component {
  render = () => {
    return (
      <div className="add-box-container">
        <form>
          <label>Name</label>
          <input type="text" onChange={this.onChange} />

          <label>Weight</label>
          <input type="text" onChange={this.onChange} />

          <label>Color</label>
          <input type="color" onChange={this.onChange} />

          <label>Destination</label>
          <select>
            {
              destinations.map(destination => (<option value={destination} key={destination}>{destination}</option>))
            }
          </select>
        </form>
      </div>
    );
  }
}

export default AddBox;
