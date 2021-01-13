import { store } from 'react-notifications-component';

export const showNotification = (message, type, shift) => {
    return store.addNotification({
        // title: "Wonderful!",
        message: message,
        type: type,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated " + shift, "animate__bounceInDown"],
        animationOut: ["animate__animated", "animate__bounceInDown"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        //   showIcon: true,
        }
    });
}
