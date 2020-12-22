import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "./loader.jsx";

import AuthContext from "../context/authContext";

import {
  getAllBoards,
  crateBoard,
  removeBoard,
  updateBoardTitle,
} from "../services/boards.js";

import "./boards.css";

export default function Boards() {
  const { state } = useContext(AuthContext);

  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const input = useRef();

  const getBoards = () => {
    setError(null);
    setLoading(true);
    getAllBoards(state.user)
      .then((data) => {
        setBoards(data.boards);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  };

  useEffect(() => {
    getBoards();
  }, []);

  const onBoardCrate = (e) => {
    setError(null);

    e.preventDefault();
    const name = input.current.value;
    crateBoard({ name, id: state.user })
      .then((res) => {
        if (res.status === 200) {
          getBoards();
          setShowInput(false);
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  };

  const onBoardRemove = (id) => {
    setError(null);

    removeBoard({ id }).then((res) => {
      if (res.status === 200) {
        getBoards();
      } else {
        setLoading(false);
        setError(res.error);
      }
    });
  };

  const onBoardTitleUpdate = (e, id, title) => {
    setError(null);

    e.preventDefault();

    updateBoardTitle(id, title).then((res) => {
      if (res.status === 200) {
        getBoards();
      } else {
        setLoading(false);
        setError(res.error);
      }
    });
  };

  const Board = ({ board }) => {
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(board.name);

    const onEdit = () => {
      setEdit(true);
    };

    return (
      <div className='my-boards__list-item' key={board.id}>
        {!edit ? (
          <Link to={`board/${board.id}`}>
            <p>{board.name}</p>
          </Link>
        ) : (
          <form
            onSubmit={(e) => {
              onBoardTitleUpdate(e, board.id, title);
            }}
          >
            <label>
              <input
                className='input_boards_q'
                defaultValue={board.name}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </form>
        )}

        <div className='my-boards__list-item-controls'>
          <button onClick={onEdit}>✏️</button>
          <button
            className='my-boards__list-item-trash'
            onClick={() => onBoardRemove(board.id)}
          >
            🗑️
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className='my-boards'>
      <div className='my-boards__inner'>
        <h2>Список доступных для вас досок</h2>
        {error && "Ошибка:" + error}
        {loading ? (
          <Loader />
        ) : (
          <>
            {boards.length === 0 ? (
              <p>У вас пока нет досок</p>
            ) : (
              <div className='my-boards__list'>
                {boards.map((b) => (
                  <Board board={b} key={b.id} />
                ))}
              </div>
            )}
            {!showInput ? (
              <button
                className='my-boards__button btn'
                onClick={() => {
                  setShowInput(true);
                }}
              >
                + Создать доску
              </button>
            ) : (
              <form onSubmit={(e) => onBoardCrate(e)}>
                <label>
                  <input
                    className='input_boards_q'
                    type='text'
                    ref={input}
                    autoFocus
                  />
                </label>
              </form>
            )}
          </>
        )}
      </div>
    </section>
  );
}
