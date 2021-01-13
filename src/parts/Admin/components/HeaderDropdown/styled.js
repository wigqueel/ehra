import styled from "styled-components";

const HeaderDropdownConrainer = styled.div`
    margin-top: 20px;
    width: 320px;
    background: #FFFFFF;
    border: 1px solid #EEF0F3;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.03);
    border-radius: 16px;
    padding: 10px;

    .dropdown-header {
        height: 200px;
        color: #fff;
        background: #4974E1;
        border-radius: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        overflow: hidden;

        .header-avatar img {
            width: 56px;
            height: 56px;
            border-radius: 12px;
            margin-bottom: 12px;
        }

        &::before {
            content: "";
            position: absolute;
            top: 46px;
            left: -82%;
            width: 308px;
            height: 207px;
            background: #3967DC;
            border-radius: 28px;
            transform: rotate(15deg);
            transform-origin: 100% 0%;
        }

        &::after {
            content: "";
            position: absolute;
            bottom: 60px;
            right: -82%;
            width: 308px;
            height: 207px;
            background: #5A81E3;
            border-radius: 28px;
            transform: rotate(15deg);
            transform-origin: 0% 100%;
        }

        .header-fio {
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: -0.02em;
            margin-bottom: 4px;
        }

        .header-role {
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
            letter-spacing: -0.02em;
        }
    }

    .dropdown-body-1 {
        background: #FFFFFF;
        box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.06);
        border-radius: 15px;
        margin: 0 18px;
        position: relative;
        top: -24px;

        .dropdown-body-1-item {
            padding: 20px;
            border-bottom: 1px solid #E8EBF0;
            display: flex;
            align-items: center;

            &:last-child {
                border-bottom: none;
            }

            img {
                margin-right: 12px;
            }

            span {
                font-weight: 300;
                font-size: 14px;
                line-height: 16px;
                letter-spacing: -0.02em;
                color: #1D1D1D;
            }
        }
    }

    .dropdown-body-2 {
        padding: 10px 22px 28px;

        .dropdown-body-2-item {
            margin-bottom: 25px;

            &:last-child {
                margin-bottom: 0;
            }

            a {
                font-size: 14px;
                line-height: 15px;
                letter-spacing: 0.01em;
                text-transform: uppercase;
                color: #121212;
                padding: 5px 10px;
                border-radius: 5px;
                transition: .2s;

                &:hover {
                    background: #f5f5f5;
                }

                &.signout {
                    color: #f0506e;

                    &:hover {
                        background: #fff0f0;
                    }
                }
            }
        }
    }
`

export default HeaderDropdownConrainer;