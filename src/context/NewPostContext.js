import React, { createContext, useState } from "react";

export const myContext = createContext();
const NewPostContext = (props) => {
  const [openPost, setOpenPost] = useState(false);
  const [flagModal, setFlagModal] = useState(false);
  function handleClickNew(e) {
    e.preventDefault();
    setOpenPost(!openPost);
  }

  function handleFlagModal(e) {
    e.preventDefault();
    setFlagModal(!flagModal);
  }

  return (
    <myContext.Provider
      value={{ openPost, handleClickNew, flagModal, handleFlagModal }}
    >
      {props.children}
    </myContext.Provider>
  );
};

export default NewPostContext;
