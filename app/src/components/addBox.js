import React from 'react';

import { FIELD_DATA, DESTINATIONS } from '../constants/fieldTypes';
import './addBox.scss';


class AddBox extends React.Component {

  defaultState = {
    nameField: {
      isValidated: false,
      value: FIELD_DATA.nameField.defaultValue
    },
    weightField: {
      isValidated: false,
      value: FIELD_DATA.weightField.defaultValue
    },
    colorField: {
      isValidated: false,
      value: FIELD_DATA.colorField.defaultValue
    },
    destinationField: {
      isValidated: false,
      value: FIELD_DATA.destinationField.defaultValue
    }
  }

  state = this.defaultState;

  handleChange(e) {
    const nameOfField = e.target.name;
    const valueOfField = e.target.value;

    this.setState({
      [nameOfField]: {...this.state[nameOfField], value: valueOfField}
    }, () => this.validate(nameOfField, valueOfField))
  }

  submit() {
    this.props.registerBox({
      nameField: this.state.nameField.value,
    })
  }

  validate(nameOfField, valueOfField) {
    let isValidated = false;

    switch(nameOfField) {
      case FIELD_DATA.nameField.id:
        isValidated = valueOfField.length > 0;
        break;
      case FIELD_DATA.weightField.id:
        isValidated = valueOfField > 0;
        break;
      case FIELD_DATA.colorField.id:
        const regExp = RegExp('^#(?:[0-9a-fA-F]{4})([0]{2})|(?:[0-9a-fA-F]{2})([0]{1})$');
        isValidated = regExp.test(valueOfField);
        break;
      case FIELD_DATA.destinationField.id:
        isValidated = DESTINATIONS.some(e => e.id === valueOfField);
        break;
      default:
        // No need to do anything
    }

    this.setState({
      [nameOfField]: {...this.state[nameOfField], isValidated: isValidated}
    });
  }

  render = () => {
    const { nameField, weightField, colorField, destinationField } = this.state;

    return (
      <div className="block">
        <form className="add-box-form">
          <label className="block__elem add-box-form__label hov">Name</label>
          <input className="block__elem add-box-form__text hover-text" name={FIELD_DATA.nameField.id}
            value={nameField.value} type="text" onChange={this.handleChange.bind(this)}/>

          <label className="block__elem add-box-form__label">Weight</label>
          <input className="block__elem add-box-form__text hover-text" name={FIELD_DATA.weightField.id}
            value={weightField.value} type="text" onChange={this.handleChange.bind(this)}/>

          <label className="block__elem add-box-form__label">Box Color</label>
          <input className="block__elem add-box-form__color hover-pointer" name={FIELD_DATA.colorField.id}
            value={colorField.value} type="color" onChange={this.handleChange.bind(this)}/>

          <label className="block__elem add-box-form__label">Destination Country</label>
          <select className="block__elem add-box-form__dropdown hover-pointer" name={FIELD_DATA.destinationField.id}
            value={destinationField.value} onChange={this.handleChange.bind(this)}>
            {
              DESTINATIONS.map(destination => (<option className="" value={destination.id} key={destination.id}>{destination.label}</option>))
            }
          </select>

          <input className="block__elem add-box-form__submit hover-pointer" type="submit"
            onClick={this.submit()} />
        </form>
      </div>
    );
  }
}

export default AddBox;
