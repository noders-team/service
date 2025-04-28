import React from "react";
import { Box, Typography } from "@mui/material";

interface ChainCardProps {
  chainName: string;
  chainId: string;
  iconUrl: string;
}

function ChainCard({ chainName, chainId, iconUrl }: ChainCardProps) {
  return (
    <Box display="flex" gap={2} sx={{ borderRadius: 2, p: 2 }} bgcolor={theme => theme.palette.background.paper}>
      <Box
        component="img"
        src={iconUrl}
        alt={chainName}
        sx={{ width: 56, height: 56 }}
      />
      <Box>
        <Typography variant="h6">{chainName}</Typography>
        <Typography
          variant="body2"
          title={chainId}
          sx={{
            maxWidth: 180,
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
