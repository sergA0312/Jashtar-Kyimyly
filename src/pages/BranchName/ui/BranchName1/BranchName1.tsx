import location from "@/shared/assets/images/locastion.svg";
import styles from "./BranchName1.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import right from "@/shared/assets/icons/arrow-right.svg";
import left from "@/shared/assets/icons/arrow-left.svg";

function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className={`${styles["custom-arrow"]} ${styles["next"]}`}
      onClick={onClick}
    >
          <img src={left} alt="Previous" />
    </button>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      className={`${styles["custom-arrow"]} ${styles["prev"]}`}
      onClick={onClick}
    >
         <img src={right} alt="Next" />
 
    </button>
  );
}

export function BranchName1() {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className={styles.branch}>
      <div className={styles.header}>
        <h2 className={styles.title}>Название отделения</h2>
        <p className={styles.subtitle}>
          Однозначно, интерактивные прототипы формируют глобальную экономическую
          сеть и при этом — заблокированы в рамках своих собственных
          рациональных ограничений. Значимость этих проблем настолько очевидна.
        </p>
        <div className={styles.location}>
          <img src={location} alt="Location Icon" />
          <span>Город, Улица, Дом</span>
        </div>
      </div>
      <Slider {...sliderSettings} className={styles.slider}>
        {people.map((person, i) => (
          <div key={i} className={styles.cardWrapper}>
            <div className={styles.card}>
              <img
                src={person.img}
                alt={person.name}
                className={styles.photo}
              />
              <div className={styles.info}>
                <h4>{person.name}</h4>
                <p>{person.role}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

const people = [
  {
    name: "Фамилия Имя Отчество",
    role: "Должность",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFmRqNor_kpqxTegpEBOVGb32Ogw9QUzUGQ&s",
  },
  {
    name: "Фамилия Имя Отчество",
    role: "Должность",
    img: "https://i.pinimg.com/236x/a7/c4/65/a7c46576be1f0e66edb4a9cdf46b9a6c.jpg",
  },
  {
    name: "Фамилия Имя Отчество",
    role: "Должность",
    img: "https://i.pinimg.com/236x/7b/44/90/7b44903de8051361d8d03f6e82e2e7ae.jpg",
  },
  {
    name: "Фамилия Имя Отчество",
    role: "Должность",
    img: "https://i.pinimg.com/736x/c7/43/2b/c7432be44f54aef54c137722fa2b197e.jpg",
  },
];
