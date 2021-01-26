import React, {useState} from 'react';
import styled from "styled-components";
import Select from "react-select";

const PaginationWrapper = styled.ul`
  display: flex;
  margin: 0 0 0 -4px;

  .pagination-item {
    margin-left: 4px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #1D1D1D;
    border: 1px solid #E8EBF0;
    border-radius: 8px;
    background: #FFFFFF;
    cursor: pointer;
    width: 32px;
    height: 32px;
    transition: .1s;

    &:hover,
    &.active {
      background: #4974E1;
      color: #fff;
    }
  }
`
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`

const Pagination = ({totalItemsCount, pageSize, currentPage, onPageChange, className, handlePageSizeChange}) => {

    const pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    // let portionCount = Math.ceil(pagesCount / portionSize);
    // let [portionNumber, setPortionNumber] = useState(1);
    // let leftPortionPageNumber  = (portionNumber - 1) * portionSize + 1;
    // let rightPortionPageNumber = portionNumber * portionSize;

    // let filteredPages = pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber);

    return (
        <StyledContainer className={className}>
            <PaginationWrapper className="uk-margin-right">
                {/* { portionNumber > 1 && <button onClick={ () => { setPortionNumber(portionNumber - 1) } }>Prev</button>}

            {filteredPages.map(p => <span className={currentPage === p && styles.selected_page} key={p} onClick={() => { onPageChanged(p) } }>{p}</span>)}

            { portionCount > portionNumber && <button onClick={ () => { setPortionNumber(portionNumber + 1) } }>Next</button>} */}


                {(currentPage > 1) && <li className={`pagination-item`} onClick={() => {
                    onPageChange(currentPage - 1)
                }}>
                    <span data-uk-icon="icon: arrow-left"></span>
                </li>}

                {pages.map(p => <li className={(currentPage === p ? `active ` : '') + `pagination-item`} key={p}
                                    onClick={() => {
                                        onPageChange(p)
                                    }}>{p}</li>)}

                {(currentPage < pagesCount) && <li className={`pagination-item`} onClick={() => {
                    onPageChange(currentPage + 1)
                }}>
                    <span data-uk-icon="icon: arrow-right"/>
                </li>}
            </PaginationWrapper>

            {!!pages.length &&
            <div className="uk-flex uk-flex-middle">
                <span className="uk-margin-small-right">Items per page:</span>
                <Select
                    value={{value: pageSize, label: pageSize}}
                    menuPlacement="top"
                    onChange={(selectedOption) => handlePageSizeChange(selectedOption.value)}
                    isSearchable={false}
                    options={[
                        {value: '8', label: '8'},
                        {value: '15', label: '15'},
                        {value: '30', label: '30'},
                        {value: '100', label: '100'},
                    ]}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 8,
                        colors: {
                            ...theme.colors,
                            primary: '#4974E1',
                        },
                    })}
                    styles={
                        {
                            control: styles => ({
                                ...styles,
                                borderColor: "#E8EBF0"
                            }),
                            indicatorSeparator: styles => ({
                                ...styles,
                                display: 'none'
                            }),
                            valueContainer: styles => ({
                                ...styles,
                                paddingRight: 0
                            }),
                            singleValue: ({maxWidth, position, top, transform, ...otherStyles}) => ({...otherStyles}),
                        }
                    }
                />
            </div>
            }
        </StyledContainer>
    )
}

export default Pagination;