import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRentalForm.css";
// import { v4 as uuid } from 'uuid'

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
function AddRentalForm({ addRentalSpace, user }) {
  const navigate = useNavigate();

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

  console.log(formData, "FORM DATA");

  /** Calls read file function with target file */
  function handlePhotoUploadChange(evt) {
    const file = evt.target.files[0];
    readFile(file);
    setFormData((formData) => ({
      ...formData,
      url: file.name,
    }));
  }

  /** converts file to encoded-64 string and sets photo state */
  function readFile(file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto({
        url: file.name,
        bytes: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  /** Calls function in parent prop to submit form data */
  function handleSubmit(evt) {
    evt.preventDefault();

    // formData.id = uuid();

    addRentalSpace({
      rentalData: formData,
      rentalPhotos: photo,
    });

    navigate(`/rentals/${user.username}`);
  }

  return (
    <form
      className="AddRentalForm mt-5 container-sm rounded shadow"
      onSubmit={handleSubmit}
    >
      <h1>Rent out your open space!</h1>
      <div className="form-group">
        <label htmlFor="description" className="text-center mb-2">
          Description
        </label>
        <textarea
          id="description"
          className="form-control"
          name="description"
          value={formData.description}
          placeholder="description"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="location" className="text-center mb-2">
          Location
        </label>
        <input
          id="location"
          className="form-control"
          name="location"
          value={formData.location}
          placeholder="location"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price" className="text-center mb-2">
          Cost to rent per day in USD
        </label>
        <input
          id="price"
          className="form-control"
          name="price"
          value={formData.price}
          placeholder="price"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="photos" className="text-center mb-2">
          Photos
        </label>
        <input
          type="file"
          onChange={handlePhotoUploadChange}
          name="photos"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary m-2">Add Space</button>
    </form>
  );
}

export default AddRentalForm;
