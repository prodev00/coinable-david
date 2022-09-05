import { Box, Container, Grid, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box borderTop="solid 1px #bdbdbd">
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">David Wang</Typography>
            <Typography variant="body2" color="grey.600">
              I found the coinable from Angel and I could work with coinable with my 7+ years of experience in web development.
              Especially, I have almost 6 years of experience in React and TypeScript.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
