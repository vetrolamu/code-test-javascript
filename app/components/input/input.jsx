import b from 'b_';
import React from 'react';

import './input.scss';

const Input = (props) => (
    <input className={b('input', {size: props.size})} {...props} />
);

Input.defaultProps = {
    size: 'm'
};

Input.propTypes = {
    size: React.PropTypes.string
};

export default Input;
