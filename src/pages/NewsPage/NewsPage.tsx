import Navpanel from '@/widgets/Navpanel/Navpanel'
import NewsHeadline from './NewsHeadline/NewsHeadline'
import { OtherNews } from './OtherNews/OtherNews'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { NewsDetailStore } from '@/app/store/news/newsDetail'
import { useEffect } from 'react'
import { useLanguageStore } from '@/app/store/languageStore'

function NewsPage() {
  const {t , i18n} = useTranslation()
      const { id } = useParams(); // <-- id из URL
  const { newsdetail, fetchNewsDetail, loading, error } = NewsDetailStore();
  const { currentLang } = useLanguageStore();
  useEffect(() => {
    if (id) {
      fetchNewsDetail(Number(id));
    }
  }, [id, currentLang]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!newsdetail) return <p>Нет данных</p>;

  return (
    <>
      <Navpanel text={t('news.home')} link='/' text2={t('news.news')} link2='/news' text3={newsdetail.title}/>
      <NewsHeadline newsdetail={newsdetail}/>
      <OtherNews/>
    </>
  )
}

export default NewsPage
