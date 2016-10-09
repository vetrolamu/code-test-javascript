import b from 'b_';
import React from 'react';

import './button.scss';

const Button = (props) => (
    <button className={b('button', {size: props.size})} {...props} />
);

Button.defaultProps = {
    size: 'm'
};

Button.propTypes = {
    size: React.PropTypes.string
};

export default Button;
