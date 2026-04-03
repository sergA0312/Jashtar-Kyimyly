import React from "react";
import "./style.scss";
import img from "../../../shared/assets/images/image.png";
import { IoCalendarOutline } from "react-icons/io5";

interface NewsHeadlineProps {
  newsdetail: {
    id: number;
    title: string;
    description: string;
    date: string;
    image: string;
  };
}
function NewsHeadline({ newsdetail }: NewsHeadlineProps) {
  const formattedDate = newsdetail.date
    ? new Date(newsdetail.date).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";
  return (
    <div className="newsheadline container">
      <h1>{newsdetail.title}</h1>
      <div className="head-news">
        <IoCalendarOutline />
        <p>{formattedDate}</p>
      </div>
      <img className="news-img" src={newsdetail.image} alt="" />
      <div className="des-news">
        <p>{newsdetail.description}</p>
        {/* <p>
              Ясность нашей позиции очевидна: глубокий уровень погружения способствует подготовке и реализации форм воздействия. Значимость этих проблем настолько очевидна, что синтетическое тестирование прекрасно подходит для реализации благоприятных перспектив.  
            </p>
            <p>Не следует, однако, забывать, что новая модель организационной деятельности предполагает независимые способы реализации позиций, занимаемых участниками в отношении поставленных задач. Как уже неоднократно упомянуто, акционеры крупнейших компаний и по сей день остаются уделом либералов, которые жаждут быть представлены в исключительно положительном свете. Но социально-экономическое развитие не оставляет шанса для существующих финансовых и административных условий. В рамках спецификации современных стандартов, непосредственные участники технического прогресса набирают популярность среди определенных слоев населения, а значит, должны быть рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Являясь всего лишь частью общей картины, элементы политического процесса ассоциативно распределены по отраслям. Являясь всего лишь частью общей картины, ключевые особенности структуры проекта призваны к ответу.</p> */}
      </div>
    </div>
  );
}

export default NewsHeadline;
