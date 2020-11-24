import React from "react";
import "./card.css";

import { ReactComponent as Flag } from "../icons/flag.svg";
import { ReactComponent as Clip } from "../icons/clip.svg";
import { ReactComponent as Comment } from "../icons/comment.svg";

export default function Card({ info, onCardDelete }) {
  const { tags, title, id } = info;

  return (
    <div className='box item' draggable='true'>
      {tags && (
        <div className='tags'>
          {tags.map((tag, i) => (
            <span key={i} className='tag'>
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className='box__text'>{title}</p>

      <div className='toolbar'>
        <Flag className='toolbar__flag icon' />
        <Clip className='toolbar__clip icon' />
        <Comment className='toolbar__comment icon' />
        <div className='avatar'></div>
      </div>
      <div className='remove-card' onClick={() => onCardDelete(id)}>
        x
      </div>
    </div>
  );
}
