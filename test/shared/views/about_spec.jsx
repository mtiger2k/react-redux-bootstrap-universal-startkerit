import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import About from '../../../source/shared/views/about.jsx';

describe('About', () => {

  it('Should render inner text', () => {
    const wrapper = shallow(<About />);
    expect(wrapper.find('h2').text()).to.contain('About');
  });

});