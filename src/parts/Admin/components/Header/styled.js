import styled from "styled-components";

const HeaderContainer = styled.div`
    height: 72px;
    padding-left: 250px;
    padding-right: 36px;
    display: flex;
    justify-content: space-between;

    .menu-wrapper {
        padding-left: 35px;

        ul {
            list-style: none;
            display: flex;
            height: 100%;

            li {
                position: relative;

                &:not(:last-child) {
                    margin-right: 30px;
                }

                &:not(:last-child)::after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    right: -15px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #4974E1;
                    transform: translate(50%, -30%);
                }

                a {
                    padding: 0 10px;
                    color: #212121;
                    position: relative;
                    display: flex;
                    align-items: center;
                    height: 100%;

                    &::before {
                        content: "";
                        position: absolute;
                        left: 50%;
                        top: 0;
                        transform: translate(-50%, -100%);
                        width: 100%;
                        height: 200%;
                        transition: .3s;
                        background-color: #4974E1;
                        border-radius: 50%;
                    }

                    &:hover::before {
                        transform: translate(-50%, -90%);
                    }
                }
            }
        }
    }

    .personal-wrapper {
        display: flex;
        height: 100%;

        .personal-item {
            border-left: 1px solid #E8EBF0;
            min-width: 74px;
            padding: 0 20px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            &:last-child {
                padding-right: 0px;
            }

            &.clickable {
                cursor: pointer;
            }

            &:not(.clickable) {
                overflow: hidden;
            }

            &:not(.clickable)::before {
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background-color: var(--primary-color);
                width: 0px;
                height: 0px;
                border-radius: 50%;
                z-index: -1;
                transition: .3s;
            }

            &:not(.clickable) > img {
                z-index: 1;
                position: relative;
                transition: .2s;
            }

            .dropdown-activator {
                display: flex;
                height: 100%;
                justify-content: center;
                align-items: center;
            }

            img.small-avatar {
                border-radius: 10px;
                width: 40px;
                height: 40px;
            }

            .dropdown-button {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
`

export default HeaderContainer;