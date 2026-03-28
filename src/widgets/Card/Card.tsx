import React from 'react'
import styles from './style.module.scss'
import defaultImg from '../../shared/assets/images/photo.png'
import { useNavigate } from 'react-router-dom'
interface Images {
    id: number;
    event: number;
    image: string
}

interface Events {
    id: number;
    title: string;
    description: string;
    date: string;
    event_status: string;
    images: Images[];
}
interface CardProps {
  item: Events
  onClick?: () => void 
}

function Card({ item , onClick}: CardProps) {
   const navigate = useNavigate()
  return (
    <div className={styles.card}>
      <div className={styles.itemCard}>
        {
            item.images.map((img) => (
            <img
              key={img.id}
              onClick={onClick}
              src={img.image}
              alt={item.title}
            />
          ))
        }
      </div>
      <div className={styles.Footercard}>
        <div className={styles.date}>{item.date.slice(5,15)}</div>
        <div>
          <h3>{item.title.slice(0, 22)}...</h3>
          <p>{item.description.slice(0, 50)}...</p>
        </div>
      </div>
    </div>
  )
}

export default Card
