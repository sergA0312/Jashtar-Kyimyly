import { MultiContainer, Typography } from "@/shared/ui";
import style from "./Movement.module.scss";
import { useTranslation } from "react-i18next";
import { useAboutMovementStore2 } from "@/app/store/aboutMovement/aboutMovement";
import { useEffect } from "react";
import { useAdvantagesStore } from "@/app/store/advantages/advantages";

const Movement = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng: string) => i18n.changeLanguage(lng);
    const {data, loading , error, fetchAboutMovement} = useAboutMovementStore2()
    useEffect(() => {
      fetchAboutMovement()
    }, [])
    const {data: advantages, loading: loader, error: advenError, fetchAdvantages} = useAdvantagesStore()
    useEffect(() => {
      fetchAdvantages()
    },[])
  // const cards = [
  //   {
  //     title: "Преимущество",
  //     description:
  //       "Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности",
  //   },
  //   {
  //     title: "Преимущество",
  //     description:
  //       "Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности",
  //   },
  //   {
  //     title: "Преимущество",
  //     description:
  //       "Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности",
  //   },
  //   {
  //     title: "Преимущество",
  //     description:
  //       "Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности",
  //   },
  // ];
  return (
    <MultiContainer>
      <Typography className={style.title} variant="h6" color="black">
        {t('landing.aboutTheMovement')}
      </Typography>

      <Typography className={style.bodyText} variant="bodyText" color="black">
      {data?.description}
      </Typography>

      <div className={style.cards}>
        <div className={style.card}>
          {advantages.map((card) => {
            return (
              <div key={card.id} className={style.cardItem}>
                <div className={style.wrapperCircleOfCard}>
                  <div className={style.circleOfCard}>
                    <div></div>
                  </div>
                </div>
                <Typography
                  className={style.cardTitle}
                  variant="h6"
                  color="black"
                >
                  Преимущество
                </Typography>
                <Typography
                  className={style.cardDescription}
                  variant="bodyText"
                  color="black"
                >
                  {card.text}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </MultiContainer>
  );
};

export default Movement;
