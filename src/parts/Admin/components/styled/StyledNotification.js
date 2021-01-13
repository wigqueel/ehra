import styled from "styled-components";
import ReactNotification from 'react-notifications-component'

const StyledNotification = styled(ReactNotification)`
    .notification-container--top-center {
        /* left: calc(50% - 75px); */
        left: calc(50% - 200px);
        min-width: 400px;
        max-width: 400px;

        .notification__item {
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.06);
            border-radius: 15px;

            &.shifted {
                left: 125px;
            }
        }

        .notification__item--success {
            background-color: #4DC989;
            border-left: none;

            .notification__content {
                padding: 11px 35px;

                .notification__message {
                    font-weight: 300;
                    font-size: 16px;
                    line-height: 160%;
                    text-align: center;
                }
            }

            .notification__timer-filler {
                background-color: rgb(255 255 255 / 0.8);
            }
        }
    }
    /* position: absolute;
    top: 10px;
    background: #4DC989;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.06);
    border-radius: 24px;
    padding: 11px 35px;
    color: #fff;
    z-index: 10;
    display: flex;
    align-items: center;
    font-weight: 300;
    font-size: 14px;
    line-height: 32px;
    color: #FFFFFF;
    left: calc(50% + var(--sidebar-width)/2);
    transform: translate(-50%, -50px);
    opacity: 0;
    pointer-events: none;
    transition: .3s; */
`
export default StyledNotification;

