import React from 'react';
import StyledPanel from './styled';


const AdminPanel = ({children}) => {

    return (
        <StyledPanel>
            {children}
        </StyledPanel>
    )
}

export default AdminPanel;