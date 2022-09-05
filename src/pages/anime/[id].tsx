import { useEffect, useState } from 'react';
import { Box, Container, Divider, Grid, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'src/axios';
import { AnimeDetail } from 'src/types';

type AnimeDetailType = {
  anime: AnimeDetail
}

const AnimeDetail: React.FC<AnimeDetailType> = ({ anime }) => {
  const router = useRouter()

  return (
    <Box py={{ sx: 4, md: 8 }}>
      <Container maxWidth="lg">
        <Box
          onClick={() => router.back()}
          py={4}
          display="flex"
          alignItems="center"
          sx={{ cursor: 'pointer' }}
        >
          <IconButton>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6">Go back to Main</Typography>
        </Box>

        <Grid spacing={4} container>
          <Grid item xs={12} md={4}>
            <Box
              borderRadius={2}
              overflow="hidden"
              position="relative"
              paddingBottom="130%"
              width="100%"
            >
              <Box position="absolute" top={0} left={0} right={0} bottom={0}>
                <Image
                  src={anime.images.jpg.image_url}
                  objectFit="cover"
                  layout="fill"
                  alt="Anime"
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="100%"
            >
              <Box display="flex" alignItems="center">
                <Typography variant="h5" sx={{ fontWeight: 700, mr: 2 }}>
                  {anime?.title}
                </Typography>

                <CheckCircleIcon sx={{ color: '#64dd17', fontSize: 32 }} />
              </Box>

              <Box>
                <Box py={1} display="flex" alignItems="center">
                  <Typography color="grey.500">Type</Typography>
                  <Box flex={1} px={2}>
                    <Divider />
                  </Box>
                  <Typography>{anime?.type}</Typography>
                </Box>

                <Box py={1} display="flex" alignItems="center">
                  <Typography color="grey.500">Source</Typography>
                  <Box flex={1} px={2}>
                    <Divider />
                  </Box>
                  <Typography>{anime?.score}</Typography>
                </Box>

                <Box py={1} display="flex" alignItems="center">
                  <Typography color="grey.500">Episodes</Typography>
                  <Box flex={1} px={2}>
                    <Divider />
                  </Box>
                  <Typography>{anime?.episodes}</Typography>
                </Box>

                <Box py={1} display="flex" alignItems="center">
                  <Typography color="grey.500">Status</Typography>
                  <Box flex={1} px={2}>
                    <Divider />
                  </Box>
                  <Typography>{anime?.status}</Typography>
                </Box>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Box textAlign="right">
                  <Typography variant="h5">{anime.score}</Typography>
                  <Typography variant="h6" color="grey.500">Score</Typography>
                </Box>

                <Box textAlign="right">
                  <Typography variant="h5">{anime.rank}</Typography>
                  <Typography variant="h6" color="grey.500">Rank</Typography>
                </Box>

                <Box textAlign="right">
                  <Typography variant="h5">{anime.popularity}</Typography>
                  <Typography variant="h6" color="grey.500">Popularity</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box py={4}>
          <Typography variant="h6" sx={{ mb: 2 }}>Description</Typography>
          <Typography variant="body1">{anime.synopsis}</Typography>
        </Box>
      </Container>
    </Box>
  )
}

export async function getServerSideProps({ query: { id = '1' } }) {
  try {
    const res = await axios.get(`/anime/${id}`)
    return { props: { anime: res?.data?.data || {} } }
  } catch (err) {
    console.log('Failed to get Anime Detail: ', err)
    return { props: { anime: {} } }
  }
}

export default AnimeDetail
