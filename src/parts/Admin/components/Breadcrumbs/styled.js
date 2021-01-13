import styled from "styled-components";

const BreadcrumbsContainer = styled.div`
    margin-bottom: 24px;

    .breadcrumb {
        list-style: none;
        display: flex;

        li {
            font-weight: 300;
            font-size: 12px;
            line-height: 16px;
            color: #1D1D1D;
            display: flex;
            align-items: center;

            &:not(:last-child)::after {
                content: "/";
                display: block;
                margin: 0 16px;
                font-size: 12px;
            }

            a {
                list-style: none;
                font-weight: 300;
                font-size: 12px;
                line-height: 16px;
                color: #6F7F8F;
                opacity: 0.5;
            }
        }
    }
`

export default BreadcrumbsContainer;