import React, { useContext, useState } from "react";
import EditEntryModal from "./EditEntryModal";
import { GlobalContext } from "../context/GlobalState";
import moment from "moment";

/**
 * Component for an Entry.
 * @param {object} props data from parent
 */
function Entry(props) {
  const [date, setDate] = useState(
    new moment(props.entry.date).utc().format("YYYY-MM-DD")
  );
  const [weight, setWeight] = useState(props.entry.weight);
  const [isModalOpen, setModalOpen] = useState(false);
  const { deleteEntry, updateEntry } = useContext(GlobalContext);

  /**
   * Toggle the Modal to be visible or not.
   * When modal is open, scrolls page to top and
   * set main container to have a blurry effect and unclickable.
   */
  const toggleModal = function () {
    window.scrollTo(0, 0);
    setModalOpen(!isModalOpen);
    if (!isModalOpen) {
      document.getElementsByClassName("container")[0].style =
        "-webkit-filter: blur(10px); -moz-filter: blur(10px); -o-filter: blur(10px); -ms-filter: blur(10px); filter: blur(10px); pointer-events: none;";
    } else {
      document.getElementsByClassName("container")[0].style = "";
    }
  };

  /**
   * Updates(edits) an entry by PUT request method.
   * @param {object} e event
   */
  const editEntry = async (e) => {
    e.preventDefault();
    updateEntry(props.entry._id, date, weight);
  };

  return (
    <tr>
      <td>{new moment(props.entry.date).utc().format("MMMM Do, YYYY")}</td>
      <td>{props.entry.weight}</td>
      <td>
        <button
          className="delete-btn"
          onClick={() => deleteEntry(props.entry._id)}
        >
          x
        </button>
      </td>
      <td>
        <button className="edit-btn" onClick={toggleModal}>
          Edit
        </button>
      </td>
      <EditEntryModal open={isModalOpen} onClose={toggleModal}>
        <div className="modal-container">
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="weight">Weight (lbs):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight..."
              required
            />
          </div>
          <button
            className="edit-btn"
            type="button"
            onClick={(e) => {
              editEntry(e);
              toggleModal();
            }}
          >
            Edit
          </button>
          <br />
          <button className="delete-btn" onClick={toggleModal}>
            Cancel
          </button>
        </div>
      </EditEntryModal>
    </tr>
  );
}
export default Entry;
