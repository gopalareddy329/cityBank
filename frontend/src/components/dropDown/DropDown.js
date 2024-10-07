import React, { useState } from 'react';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState(''); 

  const handleChange = (event) => {
    setSelectedOption(event.target.value); 
  };

  return (
    <div >
      <label htmlFor="category">Choose a category:</label>
      <select id="category" name="category" className='text-white mx-3 px-2 w-fit  hover:bg-primary-700  font-medium rounded-lg text-sm py-2.5 text-center bg-blue-700' value={selectedOption} onChange={handleChange} required={true}>
        <option value="" disabled>Select a category</option> 
        <option value="Entertainment">Entertainment</option>
        <option value="Groceries">Groceries</option>
        <option value="Dining Out">Dining Out</option>
        <option value="Utilities">Utilities</option>
        <option value="Clothing">Clothing</option>
        <option value="Mall">Mall</option>
        <option value="Education">Education</option>
        <option value="Health">Health</option>
        <option value="Travel">Travel</option>
      </select>

    </div>
  );
};

export default Dropdown;
