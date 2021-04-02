import React from "react"

export const percentFormatter = cell => {
  return <p>{cell ? `${(cell * 100).toFixed(2)}%` : ""}</p>
}
