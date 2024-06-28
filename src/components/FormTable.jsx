import React from 'react';
import "../App.css";
import { MdOutlineClose } from 'react-icons/md';

function FormTable({ handleSubmit, handleOnChange, handleClose, formData, setUserEditID }) {
  
  if (setUserEditID) {
    const userId = formData._id;
    setUserEditID(userId);
  }

  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleClose}><MdOutlineClose /></div>
        
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          onChange={handleOnChange} 
          value={formData.name} 
        />

        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          onChange={handleOnChange} 
          value={formData.email} 
        />

        <label htmlFor="mobile">Mobile:</label>
        <input 
          type="number" 
          id="mobile" 
          name="mobile" 
          onChange={handleOnChange} 
          value={formData.mobile} 
        />

        <button className="btn" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormTable;
