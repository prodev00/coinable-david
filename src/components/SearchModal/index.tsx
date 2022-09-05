import { useState } from 'react'
import { Box, IconButton, Paper, Modal, InputBase, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import Image from 'next/image'
import Link from 'next/link'
import { debounce } from 'debounce'

import axios from 'src/axios'
import { AnimeDetail } from 'src/types'

type SearchModalType = {
  onClose: () => void
}

const SearchModal: React.FC<SearchModalType> = ({ onClose }) => {
  const [list, setList] = useState<AnimeDetail[]>([])

  const handleInputChange = async (e: any) => {
    try {
      console.log('Input changed', e.target.value)
      const params = { limit: 5, q: e.target.value }
      const response = await axios.get('/anime', { params })
      setList(response?.data?.data)
    } catch (err) {
      console.log('Failed to get the search result: ', err)
    }
  }

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 400, md: 600 }
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose} sx={{ color: 'white', mr: -1 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Paper
          elevation={0}
          sx={{ flex: 1, display: 'flex', borderRadius: 8, bgcolor: 'white', px: 4, py: 2 }}
        >
          <InputBase
            placeholder="You can search for 'Kyoukai no Kanata' for example"
            sx={{ flex: 1 }}
            onChange={debounce(handleInputChange, 2000)}
          />
        </Paper>

        {list?.length > 0 && (
          <Box
            mt={4}
            bgcolor="white"
            borderRadius={4}
            overflow="hidden"
            px={4}
            py={2}
          >
            {list.map((item, index) => (
              <Link key={index} href={`/anime/${item.mal_id}`}>
                <Box
                  display="flex"
                  alignItems="center"
                  py={1}
                  sx={{ cursor: 'pointer' }}
                >
                  <Box borderRadius={2} overflow="hidden">
                    <Image
                      src={item.images.jpg?.image_url}
                      alt="Anime"
                      width={50}
                      height={50}
                      objectFit="cover"
                    />
                  </Box>

                  <Box flex={1} ml={2}>
                    <Typography>{item.title}</Typography>
                    <Typography color="grey.500" variant="body2">
                      <span>{item.type}</span>
                      <Box component="span" px={0.5}>•</Box>
                      <span>{item.episodes} Episodes</span>
                      <Box component="span" px={0.5}>•</Box>
                      <span>{item.status}</span>
                    </Typography>
                  </Box>

                  <IconButton>
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Box>
              </Link>
            ))}
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default SearchModal
