import { Spinner, useToast } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '@/components/Modals/Modal';
import { loginUserAction } from '@/states/auth/slice';
import { useAppDispatch, useAppSelector } from '@/states/hooks';
import {
  close as closeLoginModal,
  open as openLoginModal,
} from '@/states/modals/loginModal/slice';
import { ThunkFetchState } from '@/states/thunk';

import styles from './RegisterModal.module.css';

interface LoginModalProps {
  children?: React.ReactNode;
}

const LoginModal: React.FC<LoginModalProps> = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  // LoginModal Slice
  const { data: loginModalData } = useAppSelector(
    (state) => state.loginModalSlice
  );
  const { isOpen } = loginModalData;

  // Auth Modal Slice
  const { status: authStatus } = useAppSelector(
    (state) => state.authSlice.data
  );

  const formRef = useRef<HTMLFormElement | null>(null);

  /**
   * Submit Form via Ref
   */
  const submitForm = () => {
    formRef?.current?.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true })
    );
  };

  /**
   * Login on Submit
   */
  const loginOnSubmit = async () => {
    void dispatch(
      loginUserAction({
        username,
        password,
      })
    );
  };

  useEffect(() => {
    if (authStatus.login === ThunkFetchState.Fulfilled) {
      console.log('login successfully');
      toast({
        title: `User sign-in successfully`,
        description: `You can now access full features of our site`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      dispatch(closeLoginModal());
      navigate(0);
    }
  }, [authStatus.login]);

  return (
    <Modal
      title={'Sign In'}
      isOpen={isOpen}
      closeModal={() => dispatch(closeLoginModal())}
      openModal={() => dispatch(openLoginModal())}
      customActionSection={
        <button
          className={styles.actionSection}
          onClick={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          {authStatus.login !== ThunkFetchState.Pending ? (
            <span>SIGN IN</span>
          ) : (
            <Spinner />
          )}
        </button>
      }
    >
      {/* Form section */}
      <div className={styles.container}>
        {/* Form Heading */}
        <div className={styles.formHeading}>Welcome to MckEvents</div>
        {/* Form body */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginOnSubmit().catch(console.error);
          }}
          className={styles.formBody}
          ref={formRef}
        >
          {/* Username input */}
          <p className={styles.formGroup}>
            <label htmlFor="username" className={styles.formLabel}>
              Username:{' '}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              className={styles.formInput}
              placeholder="Enter your username"
            />
          </p>
          {/* Password input */}
          <p className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password:{' '}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your password"
            />
          </p>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
