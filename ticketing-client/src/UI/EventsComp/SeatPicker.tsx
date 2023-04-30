// CustomSeatPicker.tsx
import React from 'react';

interface CustomSeatPickerProps {
    seatsLayout: (number | null)[][];
    onSeatSelected: (row: number, seat: number) => void;
    selectedSeats: { row: number; seat: number }[];
}

export const CustomSeatPicker: React.FC<CustomSeatPickerProps> = ({ seatsLayout, onSeatSelected, selectedSeats }) => {
    const handleSeatClick = (row: number, seat: number) => {
        onSeatSelected(row, seat);
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
                                className={`seat ${selectedSeats.some((s: { row: number; seat: number; }) =>
                                    s.row === rowIndex + 1 && s.seat === seatNumber) ? 'selected' : ''}`}
                                onClick={() => handleSeatClick(rowIndex + 1, seatNumber)}
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
