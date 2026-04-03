import { Typography, MultiContainer } from '@/shared/ui';
import style from './Movement.module.scss';
import { useTranslation } from 'react-i18next';
import { useAboutMovementStore2 } from '@/app/store/aboutMovement/aboutMovement';
import { useEffect } from 'react';
import { useAdvantagesStore } from '@/app/store/advantages/advantages';

const Movement = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);
  const { data, loading, error, fetchAboutMovement } = useAboutMovementStore2();
  useEffect(() => {
    fetchAboutMovement();
  }, []);
  const {
    data: advantages,
    loading: loader,
    error: advenError,
    fetchAdvantages,
  } = useAdvantagesStore();
  useEffect(() => {
    fetchAdvantages();
  }, []);
  const cards = [
    {
      id: 1,
      title: 'Преимущество',
      text: 'Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности',
    },
    {
      id: 2,
      title: 'Преимущество',
      text: 'Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности',
    },
    {
      id: 3,
      title: 'Преимущество',
      text: 'Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности',
    },
    {
      id: 4,
      title: 'Преимущество',
      text: 'Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности',
    },
  ];
  return (
    <div className={`${style.movement} container`}>
      <Typography className={style.title} variant='title' color='black'>
        {t('landing.aboutTheMovement')}
      </Typography>

      <Typography className={style.bodyText} variant='desc' color='black'>
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
                  variant='card_title'
                  color='black'
                >
                  Преимущество
                </Typography>
                <Typography
                  className={style.cardDescription}
                  variant='desc'
                  color='black'
                >
                  {card.text}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
      </div>

  );
};

export default Movement;
