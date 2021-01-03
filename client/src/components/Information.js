import React from "react";

import EntryList from "./EntryList";
import GainLossDisplay from "./GainLossDisplay";
import AddEntry from "./AddEntry";
import Chart from "./Chart";

function Information() {
  return (
    <>
      <GainLossDisplay />
      <Chart />
      <AddEntry />
      <EntryList />
    </>
  );
}

export default Information;
