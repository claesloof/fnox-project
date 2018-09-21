import React from 'react';
import { mount, shallow, render } from 'enzyme';

import ErrorMessage from './errorMessage';

const mockItems = {
  notValidatedVisited: {
    validated: false,
    visited: true,
    message: "Mockelibock"
  },
  validatedVisited: {
    validated: true,
    visited: true,
    message: "Mockelibock"
  },
   notValidatedNotVisited: {
       validated: false,
       visited: false,
       message: "Mockelibock"
   }
}

describe('ErrorMessage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ErrorMessage/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display error message if not validated and visited', () => {
    const wrapper = shallow(<ErrorMessage {...mockItems.notValidatedVisited}/>);
    expect(wrapper.find('p').length).toEqual(1);
  });

  it('should not display error message if validated and visited', () => {
    const wrapper = shallow(<ErrorMessage {...mockItems.validatedVisited}/>);
    expect(wrapper.find('p').length).toEqual(0);
  });

  it('should not display error message if not validated and not visited', () => {
    const wrapper = shallow(<ErrorMessage {...mockItems.notValidatedNotVisited}/>);
    expect(wrapper.find('p').length).toEqual(0);
  });
})
