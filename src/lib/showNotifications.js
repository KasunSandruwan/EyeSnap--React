import iziToast from 'izitoast';

import errorIcon from '../assets/icons/error.svg';
import successIcon from '../assets/icons/success.svg';
import warningIcon from '../assets/icons/warning.svg';

const showNotifications = ({
  type = 'success',
  message,
  timeout = 5000,
  action = null,
  actionButtonText = '',
  onClosing = () => {}
}) => {
  // Customize the notification according to the type
  let title = 'Success!';
  let image = successIcon;
  let color = '#8BC34A';
  let titleColor = '#FFFFFF';
  let messageColor = '#FFFFFF';

  if (type === 'error') {
    title = 'Error!';
    image = errorIcon;
    color = '#F44336';
  } else if (type === 'warning') {
    title = 'Warning!';
    image = warningIcon;
    color = '#FFC107';
    titleColor = '#212121';
    messageColor = '#212121';
  }

  iziToast.show({
    title,
    message,
    color,
    image,
    timeout,
    titleColor,
    messageColor,
    position: 'topCenter',
    buttons: action
      ? [
        [
          `<button class="toast-action-button">${actionButtonText}</button>`,
          () => {
            action();
          }
        ]
      ]
      : [],
    onClosing
  });
};

export default showNotifications;
