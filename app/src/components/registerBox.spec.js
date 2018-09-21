import React from 'react';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk'
import { mount, shallow, render } from 'enzyme';

import { RegisterBox } from './RegisterBox';
import * as actions from './../actions/box';
import * as types from './../constants/actionTypes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

const mockBox = {
  name: "Slim Shady",
  weight: 2,
  color: "ffff00",
  destination: "sweden",
  multiplier: 1.2,
  cost: 2.4
}

describe('RegisterBox', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  });

  it('should render correctly', () => {
    const wrapper = shallow(<RegisterBox />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should set nameField.validate to true if correct value', () => {
    const wrapper = shallow(<RegisterBox/>);
    const value = "MGK stood no chance";
    const nameField = wrapper.find(".add-box-form__text").at(0);

    nameField.simulate("change", {target: {name: "nameField", value: value}});
    expect(wrapper.state('nameField').validated).toEqual(true);
  })

  it('should set nameField.validate to false if incorrect value', () => {
    const wrapper = shallow(<RegisterBox/>);
    const value = "";
    const nameField = wrapper.find(".add-box-form__text").at(0);

    nameField.simulate("change", {target: {name: "nameField", value: value}});
    expect(wrapper.state('nameField').validated).toEqual(false);
  })

  it('should set weightField.validate to true if correct value', () => {
    const wrapper = shallow(<RegisterBox/>);
    const value = "2";
    const weightField = wrapper.find(".add-box-form__text").at(1);

    weightField.simulate("change", {target: {name: "weightField", value: value}});
    expect(wrapper.state('weightField').validated).toEqual(true);
  })

  it('should set weightField.validate to false if incorrect value', () => {
    const wrapper = shallow(<RegisterBox/>);
    const value = "wops";
    const weightField = wrapper.find(".add-box-form__text").at(1);

    weightField.simulate("change", {target: {name: "weightField", value: value}});
    expect(wrapper.state('weightField').validated).toEqual(false);
  })

  it('should set colorField.validate to true if correct value', () => {
    const wrapper = shallow(<RegisterBox/>);
    const value = "#ffff00";
    const colorField = wrapper.find(".add-box-form__color").at(0);

    colorField.simulate("change", {target: {name: "colorField", value: value}});
    expect(wrapper.state('colorField').validated).toEqual(true);
  })

  it('should set colorField.validate to false if incorrect value', () => {
    const wrapper = shallow(<RegisterBox/>);
    const value = "#ffffff";
    const colorField = wrapper.find(".add-box-form__color").at(0);

    colorField.simulate("change", {target: {name: "colorField", value: value}});
    expect(wrapper.state('colorField').validated).toEqual(false);
  })

  it('should call REGISTER_BOX_REQUEST and REGISTER_BOX_SUCCESS on call to register box', () => {
    fetchMock.postOnce('/boxes', mockBox);

    const store = mockStore({});

    return store.dispatch(actions.register(mockBox.name, mockBox.weight, mockBox.color, mockBox.destination, mockBox.multiplier))
    .then(() => {
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: types.REGISTER_BOX_REQUEST,
            type: types.REGISTER_BOX_SUCCESS
          })
        ])
      )
    })
  })
});
