import React, { useEffect, useRef } from 'react';

import Modal from '@/components/Modals/Modal';
import { useAppDispatch, useAppSelector } from '@/states/hooks';
import {
  close as closeCreateEventModal,
  open as openCreateEventModal,
} from '@/states/modals/createEventModal/slice';
import { getEventDetailAction } from '@/states/modals/eventDetailModal/slice';

import styles from './RegisterModal.module.css';

interface EventDetailProps {
  eventId: number;
  name: string;
  children?: React.ReactNode;
}

const EventDetailModal: React.FC<EventDetailProps> = ({ eventId, name }) => {
  const dispatch = useAppDispatch();

  // EventDetailModal Slice
  const { data: eventDetailModalData } = useAppSelector(
    (state) => state.eventDetailModalSlice
  );
  const { isOpen, detail, statusDetail } = eventDetailModalData;

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
   * Create Event on Submit
   */
  const registerOnSubmit = async () => {
    // void dispatch();
  };

  useEffect(() => {
    void dispatch(getEventDetailAction(eventId));
  }, []);

  return (
    <Modal
      title={name}
      isOpen={isOpen}
      openModal={() => dispatch(openCreateEventModal())}
      closeModal={() => dispatch(closeCreateEventModal())}
      customActionSection={
        <button
          className={styles.actionSection}
          onClick={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          REGISTER
        </button>
      }
    >
      {/* Form section */}
      <div className={styles.container}>
        {/* Content here */}
        {detail && <div>{detail.description}</div>}
      </div>
    </Modal>
  );
};

export default EventDetailModal;
