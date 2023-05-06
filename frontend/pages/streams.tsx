import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Paper, Breadcrumbs, Link, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
import GrainIcon from '@mui/icons-material/Grain';

const Streams: NextPage = () => {

    const router = useRouter();

    const handleRowClick = (id: string) => {
        router.push(`/streams/${id}`);
      };


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
                    Superfluid Streams
                </Typography>
                <Typography variant="subtitle1" component="p" mb={4}>
                    You can manage your open streams - Set closing time and date, protect stream against liquidations, close stream after transferring a certain amount of tokens.
                </Typography>
                <TableContainer component={Paper}>
                <Table>
        <TableHead>
          <TableRow>
            <TableCell>Stream ID</TableCell>
            <TableCell>Stream Type</TableCell>
            <TableCell>Token Name</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>To Address</TableCell>
            <TableCell>Close Date</TableCell>
            <TableCell>Protected</TableCell>
            <TableCell>Close After</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover onClick={() => handleRowClick('1')}>
            <TableCell> 1 </TableCell>
            <TableCell> Outgoing </TableCell>
            <TableCell> DAI </TableCell>
            <TableCell> 10 / hr </TableCell>
            <TableCell> 0x123... </TableCell>
            <TableCell> 12/12/2021 </TableCell>
            <TableCell> Yes </TableCell>
            <TableCell> 100 tokens </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </TableContainer>
            </div>
        </div>
    );
};

export default Streams;
