import React, { useEffect, useState, useRef, forwardRef } from 'react';
import s from "../css/feed.module.css";
import down from "../images/down.png"

function Feed(props, ref) {
  
  const feedElements = [
    {
      title: "Luna Spellcheck",
      text: `One of the functionalities which I'm currently working on is a Papiamentu-Dutch Translator.
      While I have built a prototype, I currently do not have enough data to further develop it to the appropriate standard.
      In the meantime, I have built and made available a Papiamentu Spellchecker.`,
      page: 1,
    },{
      title: "Luna Translate",
      text: `Once obtaining enough data, this will be made.`,
      page: 1,
    },{
      title: "Luna Cool",
      text: `Made a simple implementation of Dijkstra's pathfinding algorithm in javascript.`,
      page: 2,
    },{
      title: "Luna AI",
      text: `Expirementations with PyTorch machine learning models, HuggingFace pretrained models, transfer learning and web inference with TorchServe.`,
      page: 2,
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const handleNextBtnClick = (event) => {
    let newPage = (currentPage + 1 > 2 ? 2 : currentPage + 1)
    setCurrentPage(newPage)
  }
  const handlePrevBtnClick = (event) => {
    let newPage = (currentPage - 1 < 1 ? 1 : currentPage - 1)
    setCurrentPage(newPage)
  }

  return (
    <div className={s.feed__container}>
      <div className={s.feed} ref={ref}>
        <ol className={s.feed__items}>
          {
            feedElements.map(x => (
              <div className={s.feed__item + " " + (x.page == currentPage ? s.scrollIn : s.scrollOut)}>
                <div className={s.feed__itemHeader}><h2>{x.title}</h2></div>
                <div className={s.feed__itemBody}>{x.text}</div>
              </div>
            ))
          }
        </ol>
        <div className={s.feed__nav}>
          <button className={s.feed__navBtn} onClick={handlePrevBtnClick}>
            <img src={down} alt={"down"} className={`${s.feed__navBtnImg} ${s["feed__navBtnImg--prev"]}`} /></button>
          {[...Array(2)].map((x, i) => (
            <div className={s.feed__navStatus + " " + (i + 1 == currentPage ? s["feed__navStatus--active"] : "")}>

            </div>
          ))}
          <button className={s.feed__navBtn} onClick={handleNextBtnClick}>
            <img src={down} alt={"down"} className={`${s.feed__navBtnImg} ${s["feed__navBtnImg--next"]}`} /></button>
        </div>
      </div>
    </div>
  );
}
export default forwardRef(Feed);