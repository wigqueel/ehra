import styled from 'styled-components';

const StyledFilterContainer = styled.div`
    
    overflow: hidden;
    height: 0;

    &.active {
        height: auto;
    }

    .filter-inner {
        background: #f8f9fd;
        padding: 30px 36px;
        border-radius: 24px;
        margin-bottom: 20px;
        box-shadow: 0px 0px 3px rgba(0,0,0,0.04) inset;
    }
`

const FilterContainer = ({children, ...props}) => {
    return (
        <StyledFilterContainer {...props}>
            <div className={`filter-inner`}>
                {children}
            </div>
        </StyledFilterContainer>
    )
}

export default FilterContainer;