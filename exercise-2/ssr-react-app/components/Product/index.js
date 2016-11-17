import React from 'react'
import StarRating from 'react-star-rating'
import styles from './styles'

const Product = ({
  icon_url,
  name,
  summary,
  rating,
  versions,
}) => (
  <div className={styles.product}>
    <div className={styles.icon}>
      <img className={styles.image} src={icon_url} />
    </div>
    <div className={styles.info}>
      <h4 className={styles.name}>{name}</h4>
      <p className={styles.summary}>{summary}</p>
      <StarRating name={`${name}-rating`} rating={rating} disabled={true} size={17} />
    </div>
    <div className={styles.actions}>
      <a href={versions[0].download_url} target="_blank">
        <button className={`${styles.button} ${styles.primary}`}>Download</button>
      </a>
      <button className={styles.button}>View details</button>
    </div>
  </div>
)

export default Product
