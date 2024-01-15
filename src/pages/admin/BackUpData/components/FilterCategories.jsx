import  { useState } from 'react';

export default function FilterCategories({ onSelectChange }) {
    const [selectedCategory, setSelectedCategory] = useState('all_categories');

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
        onSelectChange(selectedValue);
    };

    return (
        <select
            onChange={handleSelectChange}
            value={selectedCategory}
            className="rounded-xl p-1 md:p-2 bg-[#283d50] text-white uppercase text-xs md:text-sm"
        >
            <option value="all_categories">all_categories</option>
            <option value="comic">comic</option>
            <option value="study">study</option>
            <option value="comdy">comedy</option>
            <option value="novel">novel</option>
            <option value="horror">horror</option>
            <option value="free">free</option>
        </select>
    );
}