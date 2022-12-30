import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularIndeterminate() {
  return (
    <div style={{ display: 'flex', backgroundColor : '#F7F7F8', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </div>
  );
}