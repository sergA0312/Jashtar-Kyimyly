import React from 'react'
import styles from "./NotFound.module.scss"

function NotFound() {
  return (
    <div className={styles.notfound}>
      <h2>Ошибка 404</h2>
      <p>Произошла ошибка. Страница не найдена.</p>
      <button>
        <p>Вернуться на главную</p>
      </button>
    </div>
  )
}

export default NotFound
