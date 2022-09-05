import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { MONTH } from 'src/constants'

type HeaderType = {
  onClick?: () => void
}

const Header: React.FC<HeaderType> = ({ onClick }) => {
  const handleInputChange = () => {}

  const today = new Date()
  const currentDate = today.getDate()
  const currentMonth = today.getMonth()

  return (
    <AppBar
      sx={{ py: 2 }}
      position="relative"
      color="transparent"
    >
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={8}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: '100%' }}
            >
              <Typography variant="h5" sx={{ mr: 4 }}>Anime</Typography>

              <Paper
                sx={{ flex: 1, display: 'flex', borderRadius: 8, bgcolor: 'grey.300' }}
                elevation={0}
              >
                <IconButton>
                  <SearchIcon />
                </IconButton>

                <InputBase
                  placeholder="Search..."
                  sx={{ ml: 1, flex: 1 }}
                  onChange={handleInputChange}
                  onClick={onClick}
                />
              </Paper>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <Typography variant="body1" color="grey.500">
                Today is the {currentDate}th of {MONTH[currentMonth]}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  )
}

export default Header
