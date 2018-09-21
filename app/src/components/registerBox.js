import React from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/box';
import ErrorMessage from './errorMessage';

import {
  DESTINATIONS,
} from '../constants/destinations';

import './registerBox.scss';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onRegisterBox: (name, weight, color, destination, multiplier) => {
    dispatch(register(name, weight, color, destination, multiplier));
  }
});

export class RegisterBox extends React.Component {

  defaultInternalState = {
    nameField: {
      value: "",
      validated: false,
      visited: false
    },
    weightField: {
      value: 0,
      validated: false,
      visited: false
    },
    colorField: {
      value: "#ffff00",
      validated: true,
      visited: false
    },
    destinationField: {
      value: "sweden",
      validated: true,
      visited: false
    }
  };

  constructor() {
    super();
    this.state = this.defaultInternalState;
  }

  handleChange(e) {
    const nameOfField = e.target.name;
    const valueOfField = e.target.value;

    this.validate(nameOfField, valueOfField);
  }

  handleBlur(e) {
    const nameOfField = e.target.name;
    const valueOfField = e.target.value;

    this.setState({
      [nameOfField]: {...this.state[nameOfField], visited: true}
    });
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
        if (value < 0 || isNaN(value)) {
          value = 0;
        }
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
      [name]: {...this.state[name], value: value, validated: isValidated}
    });
  }

  save(e) {
    e.preventDefault();

    const name = this.state.nameField.value;
    const weight = parseFloat(this.state.weightField.value);
    const color = this.state.colorField.value;
    const destination = DESTINATIONS.find(el => el.id === this.state.destinationField.value);

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
          {/* Name field */}
          <label className="block__elem add-box-form__label">Name</label>
          <input className="block__elem add-box-form__text hover-text" name="nameField"
            value={nameField.value} onBlur={(event) => this.handleBlur(event)} type="text" onChange={(event) => this.handleChange(event)}/>
          <ErrorMessage validated={nameField.validated} visited={nameField.visited}
            message="Name can't be empty" />

          {/* Weight field */}
          <label className="block__elem add-box-form__label">Weight</label>
          <input className="block__elem add-box-form__text hover-text" name="weightField"
            value={weightField.value} onBlur={(event) => this.handleBlur(event)} type="text" onChange={(event) => this.handleChange(event)}/>
          <ErrorMessage validated={weightField.validated} visited={weightField.visited}
            message="Weight must be a number and larger than 0" />

          {/* Color field */}
          <label className="block__elem add-box-form__label">Box Color</label>
          <input className="block__elem add-box-form__color hover-pointer" name="colorField"
            value={colorField.value} onBlur={(event) => this.handleBlur(event)} type="color" onChange={(event) => this.handleChange(event)}/>
          <ErrorMessage validated={colorField.validated} visited={colorField.visited}
            message="Color can't be any shade of blue. Any. Shade. Of. Blue." />

          {/* Destination field */}
          <label className="block__elem add-box-form__label">Destination Country</label>
          <select className="block__elem add-box-form__dropdown hover-pointer" name="destinationField"
            value={destinationField.value} onBlur={(event) => this.handleBlur(event)} onChange={(event) => this.handleChange(event)}>
            {
              DESTINATIONS.map(destination => (<option className="" value={destination.id} key={destination.id}>{destination.label}</option>))
            }
          </select>
          <ErrorMessage validated={destinationField.validated} visited={destinationField.visited}
            message="Stop tinkering with HTML code and set correct destination" />

          {/* Submit button */}
          <input className="block__elem add-box-form__submit hover-pointer" type="submit"
            value="SAVE" disabled={!validated}  />
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterBox);
