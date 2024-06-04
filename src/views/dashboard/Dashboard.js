import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">

      <DashboardCard title="Sample Page">
        <Typography>Aqui ira los cuadros estadisticos</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;
