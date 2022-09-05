import Image from 'next/image'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'

type AnimeType = {
  id: string
  title: string
  image: string
}

const Anime: React.FC<AnimeType> = ({ id, title, image }) => {
  return (
    <Link href={`/anime/${id}`}>
      <Box
        position="relative"
        paddingBottom="140%"
        borderRadius={4}
        overflow="hidden"
        sx={{ cursor: 'pointer' }}
      >
        <Box
          position="absolute"
          width="100%"
          height="100%"
          top={0}
          left={0}
          right={0}
          bottom={0}
        >
          <Image src={image} alt="Anime" objectFit="cover" layout="fill" />
        </Box>
        
        <Box position="absolute" bottom={16} left={16}>
          <Typography color="grey.50" variant="h5">
            {title}
          </Typography>
        </Box>
      </Box>
    </Link>
  )
}

export default Anime
