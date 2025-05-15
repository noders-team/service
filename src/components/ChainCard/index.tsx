import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ChainCardProps {
  chainName: string;
  chainId: string;
  iconUrl: string;
}

function ChainCard({ chainName, chainId, iconUrl }: ChainCardProps) {
  return (
    <Box
      display="flex"
      gap={2}
      bgcolor={theme => theme.palette.background.paper}
      borderRadius={2}
      p={2}
      sx={{
        border: '1px solid transparent',
        transition: theme => theme.transitions.create('border'),
        '&:hover': {
          border: theme => `1px solid ${theme.palette.primary.main}`
        }
      }}
    >
      <Box
        component="img"
        src={iconUrl}
        alt={chainName}
        sx={{ width: 56, height: 56 }}
      />
      <Box>
        <Typography variant="h4">{chainName}</Typography>
        <Typography
          variant="body1"
          title={chainId}
          sx={{
            maxWidth: 120,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            opacity: 0.6
          }}
        >
          {chainId}
        </Typography>
      </Box>
    </Box>
  )
}

export default React.memo(ChainCard);
