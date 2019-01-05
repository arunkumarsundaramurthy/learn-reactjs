import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sqaure from '../src/Square';

Enzyme.configure({ adapter: new Adapter() });

describe('<Square />', () => {
    test('renders', () => {
        const wrapper = shallow(<Sqaure />);

        expect(wrapper.exists()).toBe(true);
    });

    test('has class square', () => {
        const wrapper = shallow(<Sqaure />);

        expect(wrapper.hasClass('square')).toBe(true);
    });

    test('calls the onclick prop when clicked', () => {
        let clicked = false;

        const wrapper = shallow(<Sqaure onClick={() => clicked = true } />);
        wrapper.simulate('click');
        
        expect(clicked).toBe(true);
    });

    test('displays the value passed as prop', () => {
        const value = 'X';
        
        const wrapper = shallow(<Sqaure value={value} />);
        
        expect(wrapper.text()).toBe(value);
    });
});