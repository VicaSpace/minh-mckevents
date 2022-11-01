import { format } from 'date-fns';

import React, { useEffect, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineShareAlt } from 'react-icons/ai';
import { BiDotsHorizontal } from 'react-icons/bi';

import { getUserDetail } from '@/lib/apis/user';
import { getNthSuffix } from '@/lib/utils/date';

import styles from './EventCard.module.css';

interface EventCardProps {
  id: number;
  name: string;
  date: string;
  location: string;
  minParticipants: number;
  office: string;
  organizerId: number;
  status: string;
  participations: any[];
  timeSlots: any[];
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  name,
  date,
  location,
  minParticipants,
  office,
  organizerId,
  status,
  participations,
  timeSlots,
}) => {
  const [parsedDate] = useState<Date>(new Date(date));
  const [organizerInfo, setOrganizerInfo] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const userDetail = await getUserDetail({
        userId: organizerId,
      });
      console.log('userDetail:', userDetail);
      setOrganizerInfo(userDetail);
    })().catch(console.error);
  }, []);

  return (
    <div className={styles.outerContainer}>
      {/* Content container */}
      <div className={styles.container}>
        {/* Left col */}
        <div className={styles.left}>
          {/* Event's name */}
          <div className={styles.eventNameText}>{name}</div>
          <div className={styles.dateText}>
            {`${parsedDate.getDate()}${getNthSuffix(parsedDate.getDate())} 
              ${format(parsedDate, 'LLL')}
            `}
          </div>
          <div className={styles.yearText}>{format(parsedDate, 'yyyy')}</div>
        </div>
        <div className={styles.middle}>
          {/* Organizer Text */}
          <div className={styles.organizerText}>
            Organizer:{' '}
            {organizerInfo ? (
              <span>
                {organizerInfo.firstName} {organizerInfo.lastName}
              </span>
            ) : (
              'N/A'
            )}
          </div>
          <div className={styles.timeSuggestionText}>
            {timeSlots.length === 0 && (
              <>Time: {format(new Date(timeSlots[0].time), 'HH:mm aa')} </>
            )}
            {timeSlots.length >= 1 && (
              <>
                <div>Time Suggestions:</div>
                {/* Render multiple time slots */}
                {timeSlots.map((t, i) => {
                  if (i >= 1) {
                    return (
                      <div key={t.id}>
                        / {format(new Date(t.time), 'HH:mm aa')}
                      </div>
                    );
                  }
                  return (
                    <div key={t.id}>{format(new Date(t.time), 'HH:mm aa')}</div>
                  );
                })}
              </>
            )}
          </div>
          <div className={styles.locationText}>Location: {location}</div>
        </div>
        <div className={styles.right}>
          <div className={styles.officeText}>Ho Chi Minh Office</div>
          {/* Participant info */}
          <div>
            {/* <div>👍 Minimum participants reached</div> */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                marginRight: '20px',
                fontSize: '12px',
                marginBottom: '20px',
              }}
            >
              {participations.length} has signed up!
            </div>
          </div>
        </div>
      </div>
      {/* Action container */}
      <div className={styles.actionSection}>
        <div className={styles.actionSectionItem}>
          {status === 'CONFIRMED' ? (
            <AiOutlineCheckCircle color="#1BB55C" />
          ) : (
            <AiOutlineCheckCircle />
          )}
        </div>
        <div className={styles.actionSectionItem}>
          <AiOutlineShareAlt />
        </div>
        <div className={styles.actionSectionItem}>
          <BiDotsHorizontal />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
