import React from 'react'
import styles from './style.module.scss'
import defaultImg from '../../shared/assets/images/photo.png'

interface Data {
  id: number
  title: string
  description: string
  date: string
  image: string
}

interface CardProps {
  item: Data
   onClick?: () => void 
}

function NewsCard({ item , onClick}: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.itemCard}>
        <img src={item.image || defaultImg} alt={item.title} onClick={onClick} />
      </div>
      <div className={styles.Footercard}>
        <div>
          <h3>?{item.title}</h3>
          <p>{item.description.slice(0, 56)}...</p>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
