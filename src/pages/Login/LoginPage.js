import { LoginForm } from '../../components/Login/LoginForm';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export const LoginModal = ({ show }) => {
  return (
    <Modal
      open={show}
      center
      closeOnEsc={false}
      closeOnOverlayClick={false}
      showCloseIcon={false}
    >
      <LoginForm />
    </Modal>
  );
};
