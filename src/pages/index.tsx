import { useState } from 'react'
import { Box, Container, Grid, Pagination } from '@mui/material'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import axios from 'src/axios'
import Anime from 'src/components/Anime'
import SearchModal from 'src/components/SearchModal'
import { useRouter } from 'next/router'

type HomeProps = {
  animes: any[]
  total: number
  page: number
}

const Home: React.FC<HomeProps> = ({ animes, total, page }) => {
  const router = useRouter()
  const [showSearch, setShowSearch] = useState(false)

  const onClickHeader = () => {
    setShowSearch(true)
  }

  if (animes?.length == 0) return null

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ minHeight: '100vh' }}
    >
      <Header onClick={onClickHeader} />
      <Box py={4} flex={1}>
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            {animes.map((item: any, index: number) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Anime
                  id={item?.entry[0]?.mal_id}
                  title={item?.entry[0]?.title}
                  image={item?.entry[0]?.images?.jpg?.image_url}
                />
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" py={4}>
            <Pagination
              count={total}
              size="large"
              page={page}
              siblingCount={0}
              onChange={(event, value) => router.push(`?page=${value}`)}
            />
          </Box>
        </Container>
      </Box>
      <Footer />

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
    </Box>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  try {
    const params = { page }
    const response = await axios.get('/recommendations/anime', { params })
    const animes = response?.data?.data || []
    const total = response?.data?.pagination?.last_visible_page || 1
    return { props: { animes, total, page: Number(page) } }
  } catch (err) {
    console.log('Failed to get server side props: ', err)
    return { props: { animes: [], total: 1, page: 1 } }
  }
}


export default Home
