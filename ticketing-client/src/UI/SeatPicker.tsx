// CustomSeatPicker.tsx
import React from 'react';

interface CustomSeatPickerProps {
    rows: number;
    seatsPerRow: number;
    onSeatSelected: (row: number, seat: number) => void;
}

export const CustomSeatPicker: React.FC<CustomSeatPickerProps> = ({ rows, seatsPerRow, onSeatSelected }) => {
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
                            className="seat"
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
