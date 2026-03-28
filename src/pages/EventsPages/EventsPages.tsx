// EventsArchive.tsx
import { eventsStore } from '@/app/store/events/events'
import img from '../../shared/assets/images/photo.png'
// import './style.scss'
import Card from '@/widgets/Card/Card'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'


export function EventsPages() {
    const usenavigate = useNavigate()
      const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  const { event, loading, error, fetchevents } = eventsStore();

  useEffect(() => {
    fetchevents();
  }, []);
 if (loading) {
  return <div className='loader'></div>;
}
if (error) {
  return <p style={{ color: "red" }}>{error}</p>;
}
  return (
    <div className='othernews container'>
        <div className='other-text'>
        <h1>{t('landing.upcomingEvents')}</h1>
         <button onClick={() => usenavigate('/')}>{t('landing.button')}</button>
        </div>
    <div className='Other-news'>
      {event.slice(3, 6).map((event) => (
        <Card onClick={() => usenavigate(`/events/${event.id}/`)} key={event.id} item={event} />
      ))}
    </div>
    </div>
  )
}

