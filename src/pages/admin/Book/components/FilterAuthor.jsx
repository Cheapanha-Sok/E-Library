import React, { useState } from 'react'

export default function FilterAuthor({ onSelectChange }) {
    const [selectedAuthor, setSelectedAuthor] = useState('all_author');

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedAuthor(selectedValue);
        onSelectChange(selectedValue);
    };

    return (
        <select
            onChange={handleSelectChange}
            value={selectedAuthor}
            className="rounded-xl p-1 md:p-2 bg-[#283d50] text-white uppercase text-xs md:text-sm"
        >
            <option value="all_author">all_author</option>
            <option value="panha">Panha</option>
            <option value="sak">sak</option>
            <option value="dara">dara</option>
            <option value="dom">dom</option>
        </select>
    );
}
