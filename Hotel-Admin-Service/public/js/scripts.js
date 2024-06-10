document.getElementById('addRoomForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = {
        roomType: e.target.roomType.value,
        price: e.target.price.value,
        available: e.target.available.value,
        startDate: e.target.startDate.value,
        endDate: e.target.endDate.value,
        hotel_id: e.target.hotelId.value
    };

    const response = await fetch('/admin/rooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Room added successfully!');
        e.target.reset();
    } else {
        const error = await response.json();
        alert('Error adding room: ' + error.message);
    }
});
