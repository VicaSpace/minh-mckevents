import { useToast } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

import Modal from '@/components/Modals/Modal';
import { createEventAction, fetchUpcomingEvents } from '@/states/event/slice';
import { useAppDispatch, useAppSelector } from '@/states/hooks';
import {
  close as closeCreateEventModal,
  open as openCreateEventModal,
} from '@/states/modals/createEventModal/slice';
import { ThunkFetchState } from '@/states/thunk';

import styles from './RegisterModal.module.css';

interface CreateEventModalProps {
  children?: React.ReactNode;
}

const CreateEventModal: React.FC<CreateEventModalProps> = () => {
  const toast = useToast();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [office, setOffice] = useState<string>('Ho Chi Minh Office');
  const [duration, setDuration] = useState<string>('');
  const [timeStart, setTimeStart] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [minParticipants, setMinParticipants] = useState<string>('');

  const dispatch = useAppDispatch();

  // CreateEventModalSlice
  const { data: createEventModalData } = useAppSelector(
    (state) => state.createEventModalSlice
  );
  const { isOpen } = createEventModalData;

  // Event slice
  const { createStatus } = useAppSelector((state) => state.eventSlice);

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
  const createOnSubmit = async () => {
    void dispatch(
      createEventAction({
        date: new Date(date),
        description,
        location,
        minParticipants: Number(minParticipants || 1),
        name,
        office,
        timeStart: new Date(timeStart),
        duration: Number(duration || 1),
      })
    );
  };

  useEffect(() => {
    if (createStatus === ThunkFetchState.Fulfilled) {
      console.log('created eventsuccessfully');
      toast({
        title: `Event created successfully`,
        description: `You can now check your created event in the dashboard`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      dispatch(closeCreateEventModal());
      // Re-fetch new data
      void dispatch(fetchUpcomingEvents());
    }
  }, [createStatus]);

  return (
    <Modal
      title={'Event Create Form'}
      isOpen={isOpen}
      closeModal={() => dispatch(closeCreateEventModal())}
      openModal={() => dispatch(openCreateEventModal())}
      customActionSection={
        <button
          className={styles.actionSection}
          onClick={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          CREATE YOUR EVENT
        </button>
      }
    >
      {/* Form section */}
      <div className={styles.container}>
        {/* Form body */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createOnSubmit().catch(console.error);
          }}
          className={styles.formBody}
          ref={formRef}
        >
          {/* Event Name input */}
          <p className={styles.formGroup}>
            <label htmlFor="eventName" className={styles.formLabel}>
              <span style={{ color: 'red' }}>*</span>&nbsp; Event name:{' '}
            </label>
            <input
              type="text"
              id="eventName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="eventName"
              className={styles.formInput}
              placeholder="Enter event name"
              required
            />
          </p>
          {/* Description input */}
          <p className={styles.formGroup}>
            <label htmlFor="description" className={styles.formLabel}>
              <span style={{ color: 'red' }}>*</span>&nbsp; Description:{' '}
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                height: '100px',
              }}
              name="description"
              className={styles.formInput}
              placeholder="Enter description"
              required
            />
          </p>
          {/* Event Date */}
          <p className={styles.formGroup}>
            <label htmlFor="date" className={styles.formLabel}>
              <span style={{ color: 'red' }}>*</span>&nbsp; Event date:{' '}
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              name="date"
              className={styles.formInput}
              placeholder="Select date"
              required
            />
          </p>
          {/* Office input */}
          <p className={styles.formGroup}>
            <label htmlFor="office" className={styles.formLabel}>
              <span style={{ color: 'red' }}>*</span>&nbsp; Office:{' '}
            </label>
            <select
              id="office"
              value={office}
              onChange={(e) => setOffice(e.target.value)}
              name="office"
              className={styles.formInput}
              placeholder="Choose office"
              required
            >
              <option value="Ho Chi Minh Office">Ho Chi Minh Office</option>
            </select>
          </p>
          {/* Duration input */}
          <p className={styles.formGroup}>
            <label htmlFor="duration" className={styles.formLabel}>
              Duration:
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              name="duration"
              className={styles.formInput}
              placeholder="Enter duration"
              required
            />
          </p>
          {/* Time Start */}
          <p className={styles.formGroup}>
            <label htmlFor="timeStart" className={styles.formLabel}>
              <span style={{ color: 'red' }}>*</span>&nbsp; Time start:{' '}
            </label>
            <input
              type="datetime-local"
              id="timeStart"
              value={timeStart}
              onChange={(e) => {
                setTimeStart(e.target.value);
              }}
              name="timeStart"
              className={styles.formInput}
              placeholder="Select time start"
              required
            />
          </p>
          {/* Location input */}
          <p className={styles.formGroup}>
            <label htmlFor="location" className={styles.formLabel}>
              <span style={{ color: 'red' }}>*</span>&nbsp; Location:{' '}
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              name="location"
              className={styles.formInput}
              placeholder="Choose location"
              required
            >
              <option value="District 1, HCMC">District 1, HCMC</option>
              <option value="District 2, HCMC">District 2, HCMC</option>
              <option value="District 3, HCMC">District 3, HCMC</option>
              <option value="District 4, HCMC">District 4, HCMC</option>
            </select>
          </p>
          {/* Min Participants input */}
          <p className={styles.formGroup}>
            <label htmlFor="minParticipants" className={styles.formLabel}>
              <span style={{ color: 'red' }}>*</span>&nbsp; Minimum
              Participants:{' '}
            </label>
            <input
              type="number"
              id="minParticipants"
              value={minParticipants}
              onChange={(e) => setMinParticipants(e.target.value)}
              name="minParticipants"
              className={styles.formInput}
              placeholder="Minimum participants"
              required
            />
          </p>
        </form>
      </div>
    </Modal>
  );
};

export default CreateEventModal;
