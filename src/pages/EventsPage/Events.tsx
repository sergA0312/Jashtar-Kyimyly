import React, { useEffect } from 'react'
import './style.module.scss'
import EventsArchive from './EventsArchive/EventsArchive'
import UpcomingEvents from './UpcomingEvents/UpcomingEvents'
import Navpanel from '@/widgets/Navpanel/Navpanel'
import { useTranslation } from 'react-i18next'
import { eventsStore } from '@/app/store/events/events'
function Events() {
   const {t, i18n} = useTranslation()
  return (
    <>
      <Navpanel text={t('events.home')} link='/' text2={t('events.events')}/>
      <UpcomingEvents/>
      <EventsArchive/>
    </>
  )
}

export default Events
