import React from 'react';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock'
import Provider from 'react-redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk'
import { mount, shallow, render } from 'enzyme';

import { DispatchList } from './DispatchList';
import * as actions from './../actions/box';
import * as types from './../constants/actionTypes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

const mockItems = [
  {
    id: 1,
    name: "Box Boxare",
    weight: 1,
    color: "#FF0000",
    cost: 9999
  },
  {
    id: 2,
    name: "Box Boxsson",
    weight: 2,
    color: "#00FF00",
    cost: 123
  },
];

function renderComponent(ComponentClass, props, reduxState={}) {
  let component = mount(<ComponentClass {...props} />, {
    context: { store: mockStore(reduxState) }
  });

  return component;
}

describe('DispatchList', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  const dispatchListFn = jest.fn();

  it('should render correctly', () => {
    const onFetchBoxes = jest.fn();
    const wrapper = renderComponent(DispatchList, {onFetchBoxes: onFetchBoxes}, {});

    expect(wrapper).toMatchSnapshot();
  });

  it('should fetch items from /boxes', () => {
    fetchMock.getOnce('/boxes', mockItems);

    const store = mockStore({boxes: []});

    return store.dispatch(actions.fetch()).then(() => {
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: types.FETCH_BOXES_REQUEST,
            type: types.FETCH_BOXES_SUCCESS
          })
        ])
      )
    })
  });

  it('should populate table with boxes', () => {
    const onFetchBoxes = jest.fn();
    const wrapper = renderComponent(DispatchList, {onFetchBoxes: onFetchBoxes, boxes: mockItems}, {});

    expect(wrapper.find('.box-table__item').length).toEqual(2);
  });
});
