// EventsArchive.tsx
import { NewsStore } from '@/app/store/news/news'
import img from '../../shared/assets/images/photo.png'
// import './style.scss'
import NewsCard from '@/widgets/NewsCard/NewsCard'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { NewsDetailStore } from '@/app/store/news/newsDetail'


export function NewsPages() {
  const { fetchNewsDetail } = NewsDetailStore();
    const usenavigate = useNavigate()
      const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);
 const {news, loading, error, fetchnews} = NewsStore()
  useEffect(() => {
fetchnews()
  }, [fetchnews])
  
  return (
    <div className='othernews container'>
        <div className='other-text'>
        <h1>{t('landing.news')}</h1>
         <button onClick={() => usenavigate('/news')}>{t('landing.button')}</button>
        </div>
    <div className='Other-news'>
      {news.slice(0,3).map((event) => (
        <NewsCard  onClick={() => usenavigate(`/news/${event.id}`)} key={event.id} item={event} />
      ))}
    </div>
    </div>
  )
}

