import React from "react";

export default function Tags({ tag }) {
  return (
    tag && (
      <div className='tags'>
        <span className='tag'>{tag}</span>
      </div>
    )
  );
}
