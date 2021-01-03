import React, { useEffect, useContext } from "react";
import Entry from "../components/Entry";

import { GlobalContext } from "../context/GlobalState";
import { useHistory } from "react-router-dom";

/**
 * Component for displaying entry information.
 */
function EntryList() {
  const history = useHistory();
  const { username, entries, getEntries } = useContext(GlobalContext);

  const entryComponent = entries.map(function (entry) {
    return (
      <Entry
        key={entry._id}
        username={entry.username}
        date={entry.date}
        weight={entry.weight}
        id={entry._id}
      />
    );
  });

  useEffect(() => {
    if (username === "") {
      history.push("/");
    } else {
      getEntries(username);
    }
  }, [history, username, getEntries]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Date(s)</th>
            <th>Weight(s)</th>
          </tr>
        </thead>
        <tbody>{entryComponent}</tbody>
      </table>
    </>
  );
}

export default EntryList;
