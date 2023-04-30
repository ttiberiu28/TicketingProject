import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface MyDateTimePickerProps {
    selected: Date;
    onChange: (date: Date) => void;
}

const MyDateTimePicker: React.FC<MyDateTimePickerProps> = ({ selected, onChange }) => {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

    return (
        <DatePicker
            selected={selectedDateTime}
            onChange={(date) => date && setSelectedDateTime(date)}
            dateFormat="dd-MM-yyyy"
        />
    );
};

export default MyDateTimePicker;
