import styled, { css } from "styled-components";

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;

    h4 {
      position: relative;
      color: red;
    }

    h4::before {
      content: "";
      position: absolute;
      width: 100%;
      max-width: 120px;
      height: 20px;
      background-color: red;
    }
  }

  .activeNavLink {
    background: -webkit-linear-gradient(#eee, gold);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
  }

  .activeNavLink::after {
    content: "";
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 4px;
    margin-top: 5px;
    border-radius: 20px;
    background: -webkit-linear-gradient(#eee, gold);
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    animation-direction: normal;
    animation: navlink 0.5s normal;
    animation-direction: alternate;
    -webkit-animation-name: navlink;
    animation-name: navlink;
  }

  @keyframes navlink {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }

  .newNotification {
  }
`;

interface NotificationsProps {
  hasNotificatons: boolean | undefined;
}

export const Notifications = styled.div<NotificationsProps>`
  ${(props) =>
    props.hasNotificatons &&
    css`
      label::before {
        content: "";
        text-align: center;
        box-shadow: 0px -2px 10px rgba(98, 73, 138, 0.2);
        border-radius: 20px;
        background: #e5bd31;
        height: 10px;
        width: 10px;
        position: absolute;
        left: 15px;
        top: 23px;
      }
    `}
`;

export const Label = styled.label`
  width: 100%;
`;

export const ContainerLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;
