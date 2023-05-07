import { Box, Typography, Paper, Breadcrumbs, Link, Card, CardContent } from '@mui/material';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import Grid from '@mui/material/Grid';


const StreamPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Panic Finance - Streams</title>
                <meta
                    content=""
                    name=""
                />
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <div className={styles.main}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/"
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Home
                    </Link>
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="text.primary"
                    >
                        <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Streams
                    </Typography>
                </Breadcrumbs>
                <Typography variant="h3" component="h3" mt={4} mb={2}>
                    Stream Details
                </Typography>
                <Box sx={{ p: 2 }}>
                    <Paper sx={{ p: 3 }}>


                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                <Grid item xs={2} sm={4} md={4} key={1}>

                                    <Card elevation={2}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Stream ID
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                123456789
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={2} sm={4} md={4} key={2}>

                                    <Card  elevation={2}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Token Name
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                DAI
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={2} sm={4} md={4} key={3}>

                                    <Card  elevation={2}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Rate
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                1 DAI / hr
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={2} sm={4} md={4} key={4}>

                                    <Card  elevation={2}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                To Address
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                0x1234567890abcdef
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={2} sm={4} md={4} key={5}>

                                    <Card  elevation={2}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Close Date
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                May 31, 2023
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={2} sm={4} md={4} key={6}>

                                    <Card  elevation={2}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Protected
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                Yes
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={2} sm={4} md={4} key={7}>

                                    <Card  elevation={2}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Close After
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                10 DAI
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </div>
        </div>

    );
};

export default StreamPage;
