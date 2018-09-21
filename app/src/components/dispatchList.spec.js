import React from 'react';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock'
import Provider from 'react-redux';
import thunk from 'redux-thunk'
import { mount, shallow, render } from 'enzyme';

import { DispatchList } from './DispatchList';
import * as actions from './../actions/box';
import * as types from './../constants/actionTypes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

const items = [
  {
    name: "Box Boxare",
    weight: 1,
    color: "#FF0000",
    destination: "sweden",
  },
  {
    name: "Box Boxsson",
    weight: 2,
    color: "#00FF00",
    destination: "china",
  },
];

describe('DispatchList', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  const dispatchListFn = jest.fn();

  it('should render correctly', () => {
    const wrapper = shallow(<DispatchList/>);
    expect(component).toMatchSnapshot();
  });

  it('should fetch items from /boxes', () => {
    fetchMock.getOnce('/boxes', items);

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
  })

  // it('should render correctly with items', () => {
  //   const wrapper = shallow(<DispatchList store={mockStore({ runtime: {} })}/>);
  //   wrapper.setProps({boxes: items});
  //   expect(wrapper.find('.box-table__item').to.have.lengthO(2));
  // });
});
