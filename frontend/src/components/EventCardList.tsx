import React from 'react';

import EventCard from '@/components/EventCard';
import EventDetailModal from '@/components/Modals/EventDetailModal';

export type EventData = Array<{
  id: number;
  description: string;
  name: string;
  date: string;
  location: string;
  minParticipants: number;
  office: string;
  organizerId: number;
  status: string;
  participations: any[];
  timeSlots: any[];
}>;

interface EventCardListProps {
  data: EventData;
}

const EventCardList: React.FC<EventCardListProps> = ({ data }) => {
  return (
    <>
      {data.map((d) => {
        return (
          <div
            key={d.id}
            style={{
              marginBottom: '26px',
            }}
          >
            <EventCard
              date={d.date}
              id={d.id}
              location={d.location}
              minParticipants={d.minParticipants}
              name={d.name}
              office={d.office}
              organizerId={d.organizerId}
              participations={d.participations}
              status={d.status}
              timeSlots={d.timeSlots}
            />
            <EventDetailModal eventId={d.id} name={d.name} />
          </div>
        );
      })}
    </>
  );
};

export default EventCardList;
