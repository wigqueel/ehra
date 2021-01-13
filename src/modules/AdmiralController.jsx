import React from 'react';
import HeadingAndSubheading from './HeadingAndSubheading/HeadingAndSubheading';
import TextAndImage from './TextAndImage/TextAndImage';

const AdmiralController = (props) => {

    let modulesArray = [];
    
    props.modules.forEach(element => {
        switch (element) {
            case 1:
                modulesArray.push(<TextAndImage />);
                break;
            
            case 2:
                modulesArray.push(<HeadingAndSubheading />);
                break;
    
            default:
                modulesArray.push('');
        }
    });   

    return modulesArray;
}

export default AdmiralController;