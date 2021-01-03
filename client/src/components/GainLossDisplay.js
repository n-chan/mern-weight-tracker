import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

/**
 * Component to show gain/loss weight.
 */
function GainLossDisplay() {
  const { entries } = useContext(GlobalContext);

  /**
   * Returns the difference between the
   * most recent weight and the second most recent weight.
   *
   * @return {float} the difference between two weights.
   */
  function getDifference() {
    if (entries.length > 1) {
      return parseFloat(entries[0].weight - entries[1].weight);
    } else {
      return 0;
    }
  }

  return (
    <div>
      <h2>
        {getDifference() >= 0 ? "You gained " : "You lost "}{" "}
        {Math.abs(getDifference())} lbs
      </h2>
    </div>
  );
}

export default GainLossDisplay;
