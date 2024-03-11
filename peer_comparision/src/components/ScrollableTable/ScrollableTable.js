import React from "react";
import "./ScrollableTable.css"; // Make sure to import your CSS file

const ScrollableTable = ({ moves }) => {
  return (
    <div className="table-container">
      <table className="scrollable-table">
        <thead>
          <tr>
            <th style={{ color: "#CBD5E1", fontWeight: "bold" }}>Name</th>
            <th style={{ color: "#CBD5E1", fontWeight: "bold" }}>Type</th>
            <th style={{ color: "#CBD5E1", fontWeight: "bold" }}>Cat.</th>
            <th style={{ color: "#CBD5E1", fontWeight: "bold" }}>Power</th>
            <th style={{ color: "#CBD5E1", fontWeight: "bold" }}>ACC.</th>
            <th style={{ color: "#CBD5E1", fontWeight: "bold" }}>PP</th>
          </tr>
        </thead>
        <tbody>
          {moves &&
            moves.map((move, index) => (
              <tr key={index}>
                <td style={{ padding: "0.5rem", color: "#CBD5E1" }}>
                  {move.name || "N/A"}
                </td>
                <td style={{ padding: "0.5rem", color: "#CBD5E1" }}>
                  {move.type.name || "N/A"}
                </td>
                <td style={{ padding: "0.5rem", color: "#CBD5E1" }}>
                  {move.damage_class.name || "N/A"}
                </td>
                <td style={{ padding: "0.5rem", color: "#CBD5E1" }}>
                  {move.power || "N/A"}
                </td>
                <td style={{ padding: "0.5rem", color: "#CBD5E1" }}>
                  {move.accuracy || "N/A"}
                </td>
                <td style={{ padding: "0.5rem", color: "#CBD5E1" }}>
                  {move.pp || "N/A"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScrollableTable;
