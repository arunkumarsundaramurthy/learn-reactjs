import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Board from '../src/Board';
import Square from '../src/Square';

Enzyme.configure({ adapter: new Adapter() });

describe('<Board />', () => {
    const squares = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    test('renders the tic tac toe board (shallow)', () => {    
        const wrapper = shallow(<Board squares={squares} />);

        const boardRows = wrapper.find('.board-row');
        expect(boardRows.length).toBe(3);

        boardRows.forEach((boardRow, rowIndex) => {
            const squares = boardRow.find(Square);
            expect(squares.length).toBe(3);

            squares.forEach((square, buttonIndex) => {
                expect(square.prop('value')).toBe((3 * rowIndex) + buttonIndex);
            });
        });
    });

    test('renders the tic tac toe board (mount)', () => {    
        const wrapper = mount(<Board squares={squares} />);

        const boardRows = wrapper.find('.board-row');
        expect(boardRows.length).toBe(3);

        boardRows.forEach((boardRow, rowIndex) => {
            const squares = boardRow.find('.square');
            expect(squares.length).toBe(3);

            squares.forEach((button, buttonIndex) => {
                expect(button.text()).toBe(`${(3 * rowIndex) + buttonIndex}`);
            });
        });
    });

    test('binds the onClick prop for each square', () => {
        let squareClicked = -1;
        const wrapper = shallow(<Board squares={squares} onClick={(i) => squareClicked = i}/>);
        
        wrapper.find(Square).first().simulate('click');
        expect(squareClicked).toBe(0);
        expect(wrapper.find(Square).first().prop('value')).toBe(0);
    });
});