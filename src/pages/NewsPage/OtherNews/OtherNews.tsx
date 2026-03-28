// EventsArchive.tsx
import NewsCard from '@/widgets/NewsCard/NewsCard'
import { useNavigate } from 'react-router-dom'
import img from '../../../shared/assets/images/photo.png'
import './style.scss'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { NewsStore } from '@/app/store/news/news'
import { NewsDetailStore } from '@/app/store/news/newsDetail'
interface Event {
  id: number
  img: string
  title: string
  description: string
}

export function OtherNews() {
    const usenavigate = useNavigate()
    const {t, i18n} = useTranslation()
  const {news, loading, error, fetchnews} = NewsStore()
   useEffect(() => {
 fetchnews()
   }, [fetchnews])
     const { fetchNewsDetail } = NewsDetailStore();
  return (
    <div className='othernews container'>
        <div className='other-text'>
        <h1>{t('news.otherNews')}</h1>
         <button onClick={() => usenavigate('/news')}>{t('news.button')}</button>
        </div>
    <div className='Other-news'>
      {news.slice(0,3).map((event) => (
        <NewsCard  onClick={() => fetchNewsDetail(event.id)} key={event.id} item={event} />
      ))}
    </div>
    </div>
  )
}

