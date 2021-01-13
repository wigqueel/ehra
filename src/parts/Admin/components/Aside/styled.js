import styled from "styled-components";

const AsideContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 250px;
    background: #4974E1;
    border-radius: 0px 16px 16px 0px;
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.06);

    .sidebar-header {
        height: 72px;
        padding: 0px 30px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(232 235 240 / 0.15);

        .logo-wrapper {
            margin-right: 12px;
        }

        .cn-wrapepr {
            color: #fff;
        }
    }

    .sidebar-body {
        max-height: calc(100vh - 72px);
        position: relative;
    }

    .sidebar-section {
        padding: 20px 0;
        border-bottom: 1px solid rgb(232 235 240 / 0.15);

        ul li.uk-open a span.expand-menu {
            transform: translateY(-50%) rotate(-90deg);
        }

        > ul > li > a {
            padding: 16px 22px;
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: -0.02em;
            border-left: 3px solid transparent;
            position: relative;
            transition: .2s;

            &:hover {
                border-color: #fff;
                background: rgba(0,0,0,0.1);
            }

            span.uk-icon:not(.expand-menu) {
                margin-right: 20px;
                width: 18px;
            }

            span.expand-menu {
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                padding: 6px;
                border-radius: 50%;
                transition: .2s;

                &:hover {
                    background: rgba(0,0,0,0.2);
                }
            }
        }

        ul.uk-nav-sub {
            position: relative;
            margin-left: 32px;

            &::before {
                content: '';
                height: 100%;
                opacity: 1;
                width: 2px;
                background: #fff;
                position: absolute;
                left: 0;
                top: 0;
            }

            li {
                margin: 5px 0;

                a {
                    padding: 7px 14px;
                    font-size: 13px;
                    color: #fff;
                    border-radius: 5px;
                    display: inline-block;
                    transition: .2s;

                    &:hover {
                        background-color: rgba(0,0,0,0.1);
                    }
                }
            }
        }
    }

    
`

export default AsideContainer;