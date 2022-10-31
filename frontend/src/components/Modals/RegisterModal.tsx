import { Spinner, useToast } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

import Modal from '@/components/Modals/Modal';
import { registerUserAction } from '@/states/auth/slice';
import { useAppDispatch, useAppSelector } from '@/states/hooks';
import {
  close as closeRegisterModal,
  open as openRegisterModal,
} from '@/states/modals/registerModal/slice';
import { ThunkFetchState } from '@/states/thunk';

import styles from './RegisterModal.module.css';

interface RegisterModalProps {
  children?: React.ReactNode;
}

const RegisterModal: React.FC<RegisterModalProps> = () => {
  const toast = useToast();

  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  // Register Modal Slice
  const { data: registerModalData } = useAppSelector(
    (state) => state.registerModalSlice
  );
  const { isOpen } = registerModalData;

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
   * Register on Submit
   */
  const registerOnSubmit = async () => {
    void dispatch(
      registerUserAction({
        email,
        firstName,
        lastName,
        password,
        username,
      })
    );
  };

  useEffect(() => {
    if (authStatus.register === ThunkFetchState.Fulfilled) {
      toast({
        title: `User registered successfully`,
        description: `You can now sign-in to access features using your registered credentials`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      dispatch(closeRegisterModal());
    }
  }, [authStatus.register]);

  return (
    <Modal
      title={'Register'}
      isOpen={isOpen}
      closeModal={() => dispatch(closeRegisterModal())}
      openModal={() => dispatch(openRegisterModal())}
      customActionSection={
        <button
          className={styles.actionSection}
          onClick={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          {authStatus.register !== ThunkFetchState.Pending ? (
            <span>SIGN UP</span>
          ) : (
            <Spinner />
          )}
        </button>
      }
    >
      {/* Form section */}
      <div className={styles.container}>
        {/* Form Heading */}
        <div className={styles.formHeading}>
          Welcome to MckEvents, please sign up to continue
        </div>
        {/* Form body */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            registerOnSubmit().catch(console.error);
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
          {/* First name input */}
          <p className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.formLabel}>
              First Name:{' '}
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="firstName"
              className={styles.formInput}
              placeholder="Enter your first name"
            />
          </p>
          {/* Last Name input */}
          <p className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.formLabel}>
              Last Name:{' '}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your last name"
            />
          </p>
          {/* Email */}
          <p className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email:{' '}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your email"
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

export default RegisterModal;
