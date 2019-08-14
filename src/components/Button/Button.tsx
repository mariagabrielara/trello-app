import React from 'react';

import './Button.scss';

interface Props {
    buttonText: string;
    buttonType?: string;
    openModal?: any;
}

const Button = (props: Props): JSX.Element => {
    let buttonClasses : string = "button";
    if (props.buttonType) {
        buttonClasses = `button ${props.buttonType}`;
    }
    return (
        <div onClick={()=>props.openModal()} className={buttonClasses}>{props.buttonText}</div>
    );
}

export default Button;