import React from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/box';

import {
  DESTINATIONS,
} from '../constants/fieldTypes';

import './registerBox.scss';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onRegisterBox: (name, weight, color, destination) => {
    dispatch(register(name, weight, color, destination));
  }
});

export class RegisterBox extends React.Component {

  defaultInternalState = {
    nameField: {
      value: "",
      validated: false
    },
    weightField: {
      value: 0,
      validated: false
    },
    colorField: {
      value: "#ffff00",
      validated: true
    },
    destinationField: {
      value: "sweden",
      validated: true
    }
  };

  constructor() {
    super();
    this.state = this.defaultInternalState;
  }

  handleChange(e) {
    const nameOfField = e.target.name;
    const valueOfField = e.target.value;

    this.setState({
      [nameOfField]: {...this.state[nameOfField], value: valueOfField}
    }, () => this.validate(nameOfField, valueOfField));
  }

  validate(name, value) {
    let isValidated = false;

    switch(name) {
      case "nameField":
        // Name must be of non-zero length
        isValidated = value.length > 0;
        break;
      case "weightField":
        // Weight > 0 and is a number
        isValidated = value > 0 && !isNaN(value);
        break;
      case "colorField":
        // Regex for color hex code - Has to conform to #nn0 or #nnnn00, where n is [0-9a-fA-F]
        // Not sure about what counts as "any shade of blue", so banned all colors containing a hint of blue
        const regExp = RegExp('^#(?:[0-9a-fA-F]{4})([0]{2})|(?:[0-9a-fA-F]{2})([0]{1})$');
        isValidated = regExp.test(value);
        break;
      case "destinationField":
        // Just incase someone modifies HTML code and tries to send invalid destination - might be a non-problem
        isValidated = DESTINATIONS.some(e => e.id === value);
        break;
      default:
        // No need to do anything
    }

    this.setState({
      [name]: {...this.state[name], validated: isValidated}
    });
  }

  save(e) {
    e.preventDefault();

    const name = this.state.nameField.value;
    const weight = parseFloat(this.state.weightField.value);
    const color = this.state.colorField.value;
    const destination = DESTINATIONS.find(el => el.id === destination);

    this.props.onRegisterBox(name, weight, color, destination.id, destination.multiplier);
  }

  render = () => {
    const nameField = this.state.nameField;
    const weightField = this.state.weightField;
    const colorField = this.state.colorField;
    const destinationField = this.state.destinationField;

    const validated = nameField.validated && weightField.validated && colorField.validated && destinationField.validated;

    return (
      <div className="block">
        <form className="add-box-form" onSubmit={(event) => this.save(event)}>
          <label className="block__elem add-box-form__label">Name</label>
          <input className="block__elem add-box-form__text hover-text" name="nameField"
            value={nameField.value} type="text" onChange={(event) => this.handleChange(event)}/>

          <label className="block__elem add-box-form__label">Weight</label>
          <input className="block__elem add-box-form__text hover-text" name="weightField"
            value={weightField.value} type="text" onChange={(event) => this.handleChange(event)}/>

          <label className="block__elem add-box-form__label">Box Color</label>
          <input className="block__elem add-box-form__color hover-pointer" name="colorField"
            value={colorField.value} type="color" onChange={(event) => this.handleChange(event)}/>

          <label className="block__elem add-box-form__label">Destination Country</label>
          <select className="block__elem add-box-form__dropdown hover-pointer" name="destinationField"
            value={destinationField.value} onChange={(event) => this.handleChange(event)}>
            {
              DESTINATIONS.map(destination => (<option className="" value={destination.id} key={destination.id}>{destination.label}</option>))
            }
          </select>

          <input className="block__elem add-box-form__submit hover-pointer" type="submit"
            value="SAVE" disabled={!validated}  />
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterBox);
