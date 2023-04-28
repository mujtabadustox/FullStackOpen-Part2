import React from "react";

const PersonForm = ({
  addPerson,
  newName,
  handleNewPerson,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewPerson} />
        </div>
        {/* <div>debug: {newName}</div> */}
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        {/* <div>debug: {newNumber}</div> */}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
