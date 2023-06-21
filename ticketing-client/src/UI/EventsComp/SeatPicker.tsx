interface CustomSeatPickerProps {
    seatsLayout: (number | null)[][];
    onSeatSelected: (row: number, seat: number) => void;
    selectedSeats: { row: number; seat: number }[];
    occupiedSeats: { row: number; seat: number }[];  // Add this line
}

export const CustomSeatPicker: React.FC<CustomSeatPickerProps> = ({
    seatsLayout,
    onSeatSelected,
    selectedSeats,
    occupiedSeats  // Add this line 
}) => {
    const handleSeatClick = (row: number, seat: number) => {
        // Check if the seat is occupied
        if (!isSeatOccupied(row, seat)) {
            onSeatSelected(row, seat);
        }
    };

    // Function to check if a seat is occupied
    const isSeatOccupied = (row: number, seat: number) => {
        return occupiedSeats.some((s) => s.row === row && s.seat === seat);
    };

    return (
        <div className="custom-seat-picker">
            <div className="screen"></div>
            {seatsLayout.map((rowSeats, rowIndex) => (
                <div key={`row-${rowIndex}`} className="row">
                    {rowSeats.map((seatNumber, seatIndex) => (
                        seatNumber !== null ? (
                            <button
                                key={`seat-${seatNumber}`}
                                className={`seat ${selectedSeats.some((s) =>
                                    s.row === rowIndex + 1 && s.seat === seatNumber) ? 'selected' : ''} 
                                ${isSeatOccupied(rowIndex + 1, seatNumber) ? 'occupied' : ''}`}  // Add the 'occupied' class if the seat is occupied
                                onClick={() => handleSeatClick(rowIndex + 1, seatNumber)}
                                disabled={isSeatOccupied(rowIndex + 1, seatNumber)}  // Disable the button if the seat is occupied
                            >
                                {seatNumber}
                            </button>
                        ) : (
                            <div key={`empty-${seatIndex}`} style={{ width: '40px', height: '30px', margin: '3px' }}></div> // Render an empty div for the white space
                        )
                    ))}
                </div>
            ))}
        </div>
    );
};
