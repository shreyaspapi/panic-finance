import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Image from 'next/image';

const columns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'address', headerName: 'Address', width: 250 },
  { field: 'streamRate', headerName: 'Rate', width: 120 },
  { field: 'streamedValue', headerName: 'streamed Value', width: 150 },
  { field: 'endDate', headerName: 'End Date', width: 100 },
  { field: 'sendValue', headerName: 'Send Value', width: 200 },
  {
    field: 'progress',
    headerName: 'Progress',
    width: 200,
    renderCell: (params) => (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              borderRadius: 2,
              bgcolor: 'background.paper',
              width: '100%',
            }}
          >
            <Box
              sx={{
                borderRadius: 2,
                bgcolor: 'green',
                width: params.value,
                height: 30,
              }}
            >
                <Typography variant="body2" sx={{color: 'white', textAlign: 'center', fontWeight: '700', alignSelf: 'center'}}>{params.value}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    ),
  },
];

const rows = [
  { id: 1, name: 'Stream 1', address: '0x123456789abcdef', streamRate: '10 DAI/day', endDate: '2022-01-01', sendValue: '1000 DAI', progress: '50%' },
  { id: 2, name: 'Ricochet ETH', address: '0x123456789abcdef', streamRate: '20 DAI/day', endDate: '2022-02-01', sendValue: '2000 DAI', progress: '75%' },
  { id: 3, name: 'Stream 3', address: '0x123456789abcdef', streamRate: '30 DAI/day', endDate: '2022-03-01', sendValue: '3000 DAI', progress: '25%' },
];

function Streams() {
  return (
    <div style={{ padding: 40 }}>
      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Image src="/sf-logo.png" alt="Superfluid Streams Logo" width={200} height={50} />
        </Box>
        <Divider />
        <Box sx={{ mt: 2, maxHeight: '60vh' }}>
          <DataGrid sx={{ minHeight: '60vh' }} rows={rows} columns={columns} disableRowSelectionOnClick />
        </Box>
      </Paper>
    </div>
  );
}

export default Streams;
