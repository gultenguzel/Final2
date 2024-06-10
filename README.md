# Hotel Booking System

The project aims to develop a hotel reservation system. This system is designed to meet the needs of users for searching hotels,
making reservations, and managing their bookings. Additionally, it provides hotel administrators with the capability to monitor
hotel capacities and send alerts for hotels with low occupancy. The system also includes a notification service to process
new bookings and send notifications to users regarding their reservation details. In this way, users can easily plan their
vacations, while hotel administrators can efficiently manage hotel capacities.

## Technologies and Programming Languages Used:

Javascript , Dockerfile , Html , Css

## Requirements:

### Book-Hotel-Service

1.createBooking(userId, roomId, startDate, endDate, numPeople):

Creates a hotel room reservation for a user within the specified date range and number of people.
userId: The ID of the user making the reservation.
roomId: The room number being reserved.
startDate: The start date of the reservation.
endDate: The end date of the reservation.
numPeople: The number of people specified for the reservation.

2.cancelBooking(bookingId):

Cancels a specific reservation.
bookingId: The ID of the reservation to be canceled.

### Hotel-Admin-Service

1.addRoom(hotelId, roomType, price, available, startDate, endDate):

Adds a new room for a hotel.
hotelId: The ID of the hotel where the room is being added.
roomType: The type of room (e.g., single, double, suite).
price: The daily price for the room.
available: The availability status of the room (true/false).
startDate: The start date of room availability.
endDate: The end date of room availability.

2.updateRoom(roomId, updates):

Updates an existing room record.
roomId: The ID of the room to be updated.
updates: The updated information (price, status, etc.).

### Hotel-Search-Service

1.searchAvailableRooms(destination, startDate, endDate, numPeople):

Searches for available rooms in a specific destination, within specified dates, and for a certain number of people.
destination: The destination being searched.
startDate: The start date of the search.
endDate: The end date of the search.
numPeople: The number of people specified for the search.

### Notification-Service

1.checkHotelCapacities():

Checks hotel capacities and sends notifications for hotels with low capacity.

2.processNewBookings():

Processes new bookings from the queue and sends notifications to users based on reservation details.

## DATA MODEL (ER DIAGRAM)

![Ekran görüntüsü 2024-06-10 180225](https://github.com/gultenguzel/Final2/assets/140374859/155f5048-bf18-4830-ad30-3d13de8e03cf)

## PRESENTATION

## Issues I Encountered

I faced difficulties in ensuring smooth integration of various services or components within the system.

I struggled with attempting to access all APIs through an API gateway.

Establishing connections to the database for the APIs also presented challenges.




