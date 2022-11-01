export const getUpcomingEventsMock = [
  {
    id: 1,
    name: 'Badminton',
    description:
      '\n      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus diam quam, aliquet et felis et, sagittis pulvinar quam. Vestibulum feugiat urna vel elit convallis, quis consequat orci laoreet. Ut lacinia purus nec convallis laoreet. Nullam eu velit eros. Aliquam lectus felis, ullamcorper quis ultricies et, convallis eu enim. Proin pretium mattis commodo. Ut diam lectus, porta nec fringilla sed, euismod in neque. Phasellus dapibus quam eget malesuada volutpat. Ut aliquet viverra tortor, in egestas turpis dapibus eu. Pellentesque mollis, odio ut semper porttitor, tellus arcu tempor erat, a pharetra nisi nisl ut risus.\n\nEtiam lacinia nunc a eros eleifend ornare. Aenean scelerisque congue tortor. Nam suscipit aliquam pellentesque. Fusce sit amet volutpat nulla, vel vestibulum sapien. Donec ut nulla convallis diam condimentum laoreet non at nibh. Curabitur vulputate faucibus quam eu volutpat. Phasellus aliquet euismod nulla, eu malesuada leo mollis at. Donec varius cursus augue, vel iaculis nibh auctor id. Cras porttitor, ante egestas posuere viverra, ligula metus dignissim odio, ut ultrices risus ex eget lorem.\n\n\n\nLocation: Thanh Nhan Badminton Court, 49 Chua Boc, District Dong Da, Ha Noi\n\nMinimum: 10 people                        \n      ',
    date: '2022-11-01T00:00:00.000Z',
    duration: 1,
    location: 'Thanh Nhan Badminton Court, 49 Chua Boc, District Dong Da',
    minParticipants: 4,
    office: 'Ho Chi Minh Office',
    organizerId: 1,
    status: 'PENDING',
    createdAt: '2022-10-31T10:11:08.986Z',
    updatedAt: '2022-10-31T10:11:08.986Z',
    participations: [
      {
        id: 1,
        eventId: 1,
        userId: 1,
        createdAt: '2022-10-31T10:11:09.020Z',
        updatedAt: '2022-10-31T10:11:09.020Z',
      },
    ],
    timeSlots: [
      {
        id: 1,
        time: '2022-12-01T12:30:00.000Z',
        eventId: 1,
        status: 'ACTIVE',
        createdAt: '2022-10-31T10:11:09.026Z',
        updatedAt: '2022-10-31T10:11:09.026Z',
      },
    ],
  },
];
