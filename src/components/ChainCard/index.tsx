import React from "react";
import { Box, Typography } from "@mui/material";

function ChainCard({ chainName, chainId, iconUrl }) {
  return (
    <Box display="flex" gap={2} sx={{ borderRadius: 2, p: 2 }}>
      <Box
        component="img"
        src={iconUrl}
        alt={chainName}
        sx={{ width: 56, height: 56 }}
      />
      <Box>
        <Typography variant="h6">{chainName}</Typography>
        <Typography 
          variant="body1" 
          title={chainId}
          sx={{
            maxWidth: 180,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {chainId}
        </Typography>
      </Box>
    </Box>
  )
}

export default ChainCard;
