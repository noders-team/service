import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CodeText from '@/components/CodeText';
import Divider from '@mui/material/Divider';

type Props = {
  iconUrl: string;
  title: string;
  chainId: string;
  version: string;
};

function PageTitle({ iconUrl, title, chainId, version }: Props): React.JSX.Element {
  const baseIconUrl = useBaseUrl(iconUrl);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <Box component="img" src={baseIconUrl} alt={title} width={56} height={56} />
        <Typography variant="h1">{title}</Typography>
      </Box>
      {chainId && version && (
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Box display="flex" gap={2}>
            <Typography variant="subtitle2">Chain ID:</Typography>
            <CodeText text={chainId} />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box display="flex" gap={2}>
            <Typography variant="subtitle2">Current Node Version:</Typography>
            <CodeText text={version} />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PageTitle;
