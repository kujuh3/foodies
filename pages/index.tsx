import { useUser } from '@auth0/nextjs-auth0'
import Layout from '../components/layout'
import SearchBar from '../components/searchbar'
import { useState, useEffect } from 'react'

export function getServerSideProps() {
  return {
      props: { message: process.env.EDAMAM_APP_ID },
  };
}

type ProcessProps = {
  key: String
}

const Home = ({ key }: ProcessProps) => {
  const { user, isLoading } = useUser()

  const handleChange = (input:string) => {
    console.log(key)
  }

  return (
    <Layout user={user} loading={isLoading}>
      <h1>Foodies</h1>
      <p>Looking for a recipe? Try searching for one from the search field below!</p>

      <SearchBar
        change={handleChange}
      />


    </Layout>
  )
}

// fast/cached SSR page
export default Home
