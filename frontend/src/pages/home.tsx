import { Heading, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AiOutlineSearch } from 'react-icons/ai';

import EventCardList from '@/components/EventCardList';
import CreateEventModal from '@/components/Modals/CreateEventModal';
import LeftNavbar from '@/components/Navbar/LeftNavbar';
import RightNavbar from '@/components/Navbar/RightNavbar';
import { verifyUser } from '@/lib/apis/auth';
import { authenticateUser } from '@/states/auth/slice';
import { fetchUpcomingEvents } from '@/states/event/slice';
import { useAppDispatch, useAppSelector } from '@/states/hooks';
import { open as openCreateEventModal } from '@/states/modals/createEventModal/slice';
import { ThunkFetchState } from '@/states/thunk';

import styles from './home.module.css';

const HomePage: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authSlice.data);
  const { data: eventData, status } = useAppSelector(
    (state) => state.eventSlice
  );

  // const { data: createEventModalData } = useAppSelector(
  //   (state) => state.createEventModalSlice
  // );
  // const { isOpen } = createEventModalData;

  const [searchQuery, setSearchQuery] = useState<string>('');

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

  /**
   * Verify User token on page mounted
   */
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken') ?? null;
    if (!accessToken) return;
    verifyUserToken().catch(console.error);
  }, []);

  useEffect(() => {
    void dispatch(fetchUpcomingEvents());
  }, []);

  // Debug check
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
        {/* Upcoming Event */}
        <div className="bottom">
          {!isAuth && 'Please Log-in to access content'}
          {isAuth && (
            <>
              <div className={styles.eventContainer}>
                {/* Heading section */}
                <Heading
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  Upcoming Events
                </Heading>
                {/* Create new Event button */}
                <div
                  style={{
                    float: 'right',
                  }}
                >
                  <button
                    className={styles.createEventBtn}
                    onClick={() => {
                      dispatch(openCreateEventModal());
                    }}
                  >
                    Create new event
                  </button>
                </div>
                <br
                  style={{
                    clear: 'both',
                  }}
                />
                {/* Action Section */}
                <div className={styles.actionSection}>
                  {/* Left */}
                  <div className={styles.actionSectionLeft}>
                    {/* Input Search */}
                    <div className={styles.actionSearch}>
                      <input
                        type="text"
                        placeholder="Search for event"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.actionSearchInput}
                      />
                      <button className={styles.actionSearchInputBtn}>
                        <AiOutlineSearch />
                      </button>
                    </div>
                    {/* Office filter */}
                    <div
                      style={{
                        marginBottom: '11px',
                      }}
                    >
                      <input
                        type="checkbox"
                        id="office1"
                        name="office1"
                        value="Ho Chi Minh Office"
                        defaultChecked
                      />

                      <label htmlFor="office1">&nbsp; Ho Chi Minh Office</label>
                    </div>
                  </div>
                  {/* Right */}
                  <div className={styles.actionSectionRight}></div>
                </div>
                {/* List Events section */}
                <div
                  style={{
                    marginTop: '24px',
                  }}
                >
                  {/* Fetch data when wake up */}
                  {status === ThunkFetchState.Fulfilled && (
                    <EventCardList data={eventData} />
                  )}
                  {status === ThunkFetchState.Pending && <Spinner />}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <CreateEventModal />
    </>
  );
};

export default HomePage;
