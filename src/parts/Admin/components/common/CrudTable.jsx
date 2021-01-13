import React from 'react';
import CrudTableContainer from '../styled/CrudTableContainer';

const CrudTable = (props) => {
    const fields = props.fields;
    const items = props.items;

    const firstLetterUppercase = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            {items && <CrudTableContainer>
                <thead>
                    <tr>
                        {fields.map(field => <th>{firstLetterUppercase(field)}</th>)}
                    </tr>
                </thead>

                <tbody>
                    {items.map(item => {
                        return (
                            <tr key={item.id}>
                                {fields.map(field => <td>{item[field]}</td>)}
                            </tr>
                        )
                    })}
                </tbody>
            </CrudTableContainer>}
        </>
    )
}

export default CrudTable;