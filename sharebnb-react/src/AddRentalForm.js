import { useState } from 'react';
import './AddRentalForm.css'

/** Form to add rental
 *
 * Props:
 *  -
 *
 * State:
 *  - formData: data about rental
 *
 * User -> AddRentalForm
 */
function AddRentalForm({}) {

  const initialFormData = {
    description: '',
    location: '',
    price: '',
  }

  const [formData, setFormData] = useState(initialFormData);
  const [photos, setPhotos] = useState(null);

  /**  */
  function handleChange(evt) {

  }

  /**  */
  function handleSubmit(evt) {

  }

  return (
    <form className='AddRentalForm' onSubmit={handleSubmit}>
      <h1>Rent out your open space!</h1>
      <label htmlFor='description'>Description </label>
      <textarea
        id='description'
        className='AddRentalForm-input'
        name='description'
        value={formData.description}
        placeholder='description'
        onChange={handleChange}
      />
      <label htmlFor='location'>Location </label>
      <input
        id='location'
        className='AddRentalForm-input'
        name='location'
        value={formData.location}
        placeholder='location'
        onChange={handleChange}
      />
      <label htmlFor='price'>Cost to rent per day in USD </label>
      <input
        id='price'
        className='AddRentalForm-input'
        name='price'
        value={formData.price}
        placeholder='price'
        onChange={handleChange}
      />
    </form>
  );
}


export default AddRentalForm;