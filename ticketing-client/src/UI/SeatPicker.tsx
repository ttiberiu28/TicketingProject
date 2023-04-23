// CustomSeatPicker.tsx
import React from 'react';

interface CustomSeatPickerProps {
    rows: number;
    seatsPerRow: number;
    onSeatSelected: (row: number, seat: number) => void;
    selectedSeats: { row: number; seat: number }[]; // Add this line
}

export const CustomSeatPicker: React.FC<CustomSeatPickerProps> = ({ rows, seatsPerRow, onSeatSelected, selectedSeats }) => {
    const handleSeatClick = (row: number, seat: number) => {
        onSeatSelected(row, seat);
    };

    return (
        <div className="custom-seat-picker">
            <div className="screen"></div>
            {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={`row-${rowIndex}`} className="row">
                    {Array.from({ length: seatsPerRow }, (_, seatIndex) => (
                        <button
                            key={`seat-${seatIndex}`}
                            className={`seat ${selectedSeats.some((s: { row: number; seat: number; }) => s.row === rowIndex + 1 && s.seat === seatIndex + 1) ? 'selected' : ''}`}
                            onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 1)}
                        >
                            {seatIndex + 1}
                        </button>

                    ))}
                </div>
            ))}
        </div>
    );
};
