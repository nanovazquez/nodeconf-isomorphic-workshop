import 'isomorphic-fetch'
import React from 'react'
import Search from '../components/Search'
import Product from '../components/Product'
import Head from 'next/head'

import styles from './styles'

export default class Home extends React.Component {

  static getItemsUrl ({ initialPage, itemsPerPage, searchTerms, sortBy }) {
    const baseUri = 'https://anypoint.mulesoft.com/exchange/api/objects'
    return `${baseUri}?page=${initialPage}&perPage=${itemsPerPage}&searchTerms=${searchTerms}&sortBy=${sortBy}`
  }

  static async getInitialProps () {
    const uri = Home.getItemsUrl({ initialPage: 0, itemsPerPage: 20, searchTerms: '', sortBy: 'rating' })

    try {
      const res = await fetch(uri)
      const data = await res.json()
      return { items: data }
    }
    catch (error) {
      return null
    }
  }

  static defaultProps = {
    items: [],
  }

  render () {
    return (
      <div className={styles.body}>
        <Head>
          <meta name="google-site-verification" content="3x0mypNy4u-DYuQm2X0_UFEGF7gXEtexMLrTc5UOHCk" />
          <title>Next React app</title>
        </Head>
        <Search placeholder="Search" />
        <div className={styles.items}>
          {
            this.props.items.map(item => <Product key={item.id} {...item} />)
          }
        </div>
      </div>
    )
  }
}
