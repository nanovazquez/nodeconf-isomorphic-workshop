import React from 'react'
import styles from './styles'

const Search = ({
  placeholder,
  value,
}) => (
  <div className={styles.search}>
    <input className={styles.input} placeholder="Search" value={value} />
  </div>
)

export default Search
