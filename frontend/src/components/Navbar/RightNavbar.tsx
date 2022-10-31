import React, { useEffect, useState } from 'react';
import { AiOutlineBell } from 'react-icons/ai';

import LoginModal from '@/components/Modals/LoginModal';
import RegisterModal from '@/components/Modals/RegisterModal';
import { VerifyUser } from '@/lib/apis/auth';
import { useAppDispatch, useAppSelector } from '@/states/hooks';
import { open as openLoginModal } from '@/states/modals/loginModal/slice';
import { open as openRegisterModal } from '@/states/modals/registerModal/slice';

import './RightNavbar.css';

const RightNavbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authSlice.data);
  const [user, setUser] = useState<VerifyUser | null>(null);

  useEffect(() => {
    if (isAuth) {
      const user = JSON.parse(
        localStorage.getItem('user') as string
      ) as VerifyUser;
      setUser(user);
    }
  }, [isAuth]);
  return (
    <div className="top-right">
      {isAuth && user ? (
        <>
          <div>
            <AiOutlineBell fontSize={24} />
          </div>
          <div className="right-navbar-user-info">
            <div style={{ display: 'inline-flex', flexDirection: 'row' }}>
              <div>{`${user.firstName} ${user.lastName} (${user.email})`}</div>
              <div>
                <img
                  src="https://ui-avatars.com/api/?name=Minh"
                  alt="avatar"
                  width="24.0px"
                  height="24.0px"
                  style={{
                    borderRadius: '20px',
                    marginLeft: '12px',
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            className="right-navbar-sign-up-btn"
            onClick={() => dispatch(openRegisterModal())}
          >
            Sign-up
          </button>
          <button
            className="right-navbar-sign-in-btn"
            onClick={() => dispatch(openLoginModal())}
          >
            Sign-in
          </button>
        </>
      )}
      <RegisterModal />
      <LoginModal />
    </div>
  );
};

export default RightNavbar;
