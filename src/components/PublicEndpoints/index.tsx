import Box from '@mui/material/Box';
import React, { version } from 'react';
import Typography from '@mui/material/Typography';
import { PublicEndpoint } from '@/types/PublicEndpoint';
import crawlerService from '@/service/crawlerService';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Link from '@mui/material/Link';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { FiAlertTriangle, FiCheck } from 'react-icons/fi';
import CopyButton from '@/components/CopyButton';
import Skeleton from '@mui/material/Skeleton';
import CodeText from '../CodeText';
import Divider from '@mui/material/Divider';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#16181C',
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: 'transparent',
  },
}));

type Props = {
  chainId: string;
};

function PublicEndpoints({ chainId }: Props): React.JSX.Element {
  const [publicEndpoints, setPublicEndpoints] = React.useState<PublicEndpoint[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const theme = useTheme();

  React.useEffect(() => {
    crawlerService.getPublicEndpointsByChainId(chainId).then((endpoints) => {
      setPublicEndpoints(endpoints);
      setIsLoading(false);
    });
  }, [chainId]);

  return (
    <Box display="flex" flexDirection="column" gap={2} pt={5}>
      <Typography variant="h3">RPC / API / gRPC Endpoints</Typography>

      <Box display="flex" flexWrap="wrap" gap={2} pb={2}>
        <Box display="flex" gap={2}>
          <Typography variant="subtitle2">Providers:</Typography>
          {isLoading ? (
            <Skeleton variant="text" width={25} height={20} />
          ) : (
            <CodeText text={publicEndpoints.length.toString()} />
          )}
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box display="flex" gap={2}>
          <Typography variant="subtitle2">Last updated:</Typography>
          {isLoading ? <Skeleton variant="text" width={100} height={20} /> : <CodeText text={'1 hour ago'} />}
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography variant="subtitle2">Endpoint</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2">Location</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2">Block Height</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2">Indexation</Typography>
              </StyledTableCell>
              <StyledTableCell>Archival</StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2">Moniker</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2">Validator</Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? [...Array(10)].map((item) => (
                  <TableRow>
                    <TableCell align="center">
                      <Skeleton variant="text" width={200} height={20} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="text" width={50} height={20} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="text" width={60} height={20} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="text" width={100} height={20} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="text" width={100} height={20} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="text" width={200} height={20} />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="text" width={50} height={20} />
                    </TableCell>
                  </TableRow>
                ))
              : publicEndpoints.map((endpoint) => (
                  <StyledTableRow key={endpoint.id}>
                    <TableCell>
                      <Box display="flex" gap={1} alignItems="center">
                        <Typography variant="body1">RPC:</Typography>
                        <Link href={`http://${endpoint.ip}:${endpoint.rpc_port}`}>
                          {endpoint.ip + ':' + endpoint.rpc_port}
                        </Link>
                        <CopyButton copyText={`http://${endpoint.ip}:${endpoint.rpc_port}`} />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box component="img" src={endpoint.flag.img} alt={endpoint.flag.emoji} width={22} height={16} />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {endpoint.earliest_block}-{endpoint.latest_block}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <CustomChip
                        icon={endpoint.tx_index_enabled ? <FiCheck color={theme.palette.success.main} /> : undefined}
                        label={endpoint.tx_index_enabled ? 'On' : 'Off'}
                        color={endpoint.tx_index_enabled ? theme.palette.success.main : '#FFFFFF'}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {endpoint.archive && (
                        <CustomChip
                          icon={<FiCheck color={theme.palette.success.main} />}
                          label="Archival"
                          color={theme.palette.success.main}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{endpoint.moniker}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <CustomChip
                        icon={endpoint.validator ? <FiAlertTriangle color={theme.palette.warning.main} /> : undefined}
                        label={endpoint.validator ? 'Yes' : 'No'}
                        color={endpoint.validator ? theme.palette.warning.main : '#FFFFFF'}
                      />
                    </TableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

type CustomChipProps = {
  icon?: React.ReactNode;
  label: string;
  color: string;
};

function CustomChip({ icon, label, color }: CustomChipProps) {
  const isWhite = color === '#FFFFFF';
  return (
    <Box
      display="inline-flex"
      justifyContent="center"
      paddingY={0.5}
      paddingX={1}
      borderRadius={2}
      gap={0.5}
      width="fit-content"
      sx={{
        backgroundColor: alpha(color, isWhite ? 0.1 : 0.2),
        border: `1px solid ${alpha(color, isWhite ? 0.1 : 0.4)}`,
      }}
    >
      {icon && icon}
      <Typography
        variant="body2"
        color={color}
        sx={{
          fontFamily: 'Consolas, monospace',
          fontSize: '15px',
          fontWeight: 400,
          fontStyle: 'normal',
          lineHeight: '16px',
          opacity: isWhite ? 0.4 : 1,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default PublicEndpoints;
