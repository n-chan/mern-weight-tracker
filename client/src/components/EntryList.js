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

  useEffect(() => {
    //console.log("A");
    if (username === "") {
      history.push("/");
    } else {
      getEntries(username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Date(s)</th>
            <th>Weight(s)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <Entry key={entry._id} entry={entry} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default EntryList;
