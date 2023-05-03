import { useState } from "react";
import "./AddRentalForm.css";

/** Form to add rental
 *
 * Props:
 *  - addRentalSpace: parent function to call
 *
 * State:
 *  - formData: data about rental
 *
 * User -> AddRentalForm
 */
function AddRentalForm({ addRentalSpace }) {
  const initialFormData = {
    description: "",
    location: "",
    price: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [photo, setPhoto] = useState("");

  /** Handles change of form */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  /** Calls read file function with target file */
  function handlePhotoUploadChange(evt) {
    const file = evt.target.files[0];
    readFile(file);
  }

  /** converts file to encoded-64 string and sets photo state */
  function readFile(file) {
    const reader = new FileReader();
    reader.onloadend = (evt) => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  }

  /** Calls function in parent prop to submit form data */
  function handleSubmit(evt) {
    evt.preventDefault();
    addRentalSpace({
      rentalData: formData,
      rentalPhotos: photo,
    });
  }

  return (
    <form className="AddRentalForm" onSubmit={handleSubmit}>
      <h1>Rent out your open space!</h1>
      <label htmlFor="description">Description </label>
      <textarea
        id="description"
        className="AddRentalForm-input"
        name="description"
        value={formData.description}
        placeholder="description"
        onChange={handleChange}
      />
      <label htmlFor="location">Location </label>
      <input
        id="location"
        className="AddRentalForm-input"
        name="location"
        value={formData.location}
        placeholder="location"
        onChange={handleChange}
      />
      <label htmlFor="price">Cost to rent per day in USD </label>
      <input
        id="price"
        className="AddRentalForm-input"
        name="price"
        value={formData.price}
        placeholder="price"
        onChange={handleChange}
      />
      <input type="file" onChange={handlePhotoUploadChange} name="photos" />
      <button>Add Space</button>
    </form>
  );
}

export default AddRentalForm;
