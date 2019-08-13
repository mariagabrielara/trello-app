import React from 'react';

import './Button.scss';

interface Props {
    buttonText: string;
    buttonType?: string;
}

const Button = (props: Props): JSX.Element => {
    let buttonClasses : string = "button";
    if (props.buttonType) {
        buttonClasses = `button ${props.buttonType}`;
    }
    return (
        <div className={buttonClasses}>{props.buttonText}</div>
    );
}

export default Button;