import styled from "styled-components";

import SortDefault from '../../../../assets/icons/sort_arrows.svg';
import SortDesc from '../../../../assets/icons/sort_desc.svg';
import SortAsc from '../../../../assets/icons/sort_asc.svg';

const CrudTableContainer = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 5px;

    thead tr th {
        padding: 12px 24px;
        text-align: left;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.03em;
        font-weight: 400;
        color: #99A6B6;
        cursor: pointer;

        /* a {
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            letter-spacing: -0.02em;
            color: #99A6B6;

            
        } */

        &.sort_allow {
            &::before {
                content: url(${SortDefault});
                margin-right: 4px;
            }

            &.sort_desc {
            color: #212121 !important;
            font-weight: 500;

                &::before {
                    content: url(${SortDesc});
                }
            }

            &.sort_asc {
                color: #212121 !important;
                font-weight: 500;

                &::before {
                    content: url(${SortAsc});
                }
            }
        }

        &.actions-head {
            text-align: right;
        }
    }

    tbody tr {
        background: #FFFFFF;
        box-sizing: border-box;
        box-shadow: 0px 0px 1px 1px rgb(245 245 245);
        border-radius: 12px;
        transition: .2s;
        
        td {
            padding: 12px 24px;
            text-align: left;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: -0.03em;
            color: #1D1D1D;
            font-weight: 300;
        }
    }
`
export default CrudTableContainer;