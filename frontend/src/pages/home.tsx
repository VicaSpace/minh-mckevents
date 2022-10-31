import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import LeftNavbar from '@/components/Navbar/LeftNavbar';
import RightNavbar from '@/components/Navbar/RightNavbar';
import { verifyUser } from '@/lib/apis/auth';
import { authenticateUser } from '@/states/auth/slice';
import { useAppDispatch, useAppSelector } from '@/states/hooks';

import './home.css';

const HomePage: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authSlice.data);

  /**
   * Verify User via Token
   */
  const verifyUserToken = async () => {
    const accessToken = localStorage.getItem('accessToken') ?? null;
    if (!accessToken) return;
    const user = await verifyUser({
      accessToken,
    });
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(authenticateUser());
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') ?? null;
    if (!accessToken) return;
    verifyUserToken().catch(console.error);
  }, []);

  useEffect(() => {
    if (isAuth) {
      console.log('User is authenticated ✅');
    } else {
      console.log('User is NOT authenticated ❌');
    }
  }, [isAuth]);
  return (
    <>
      {/* Meta section */}
      <Helmet>
        <title>McKEvents - Be Informed!</title>
        <meta name="Let's chill in this McHouse Lounge" content="VicaSpace" />
      </Helmet>
      {/* Main Home structure */}
      <div id="left" className="column">
        <LeftNavbar />
        {/* Calendar component here */}
        <div className="bottom">Calendar-here</div>
      </div>
      <div id="right" className="column">
        <RightNavbar />
        <div className="bottom">
          {isAuth ? 'Content Unlocked' : 'Please Log-in'}
        </div>
      </div>
    </>
  );
};

export default HomePage;
