import React from "react";
import { Box, Typography } from "@mui/material";

function ImgContainer(imgUrl: string) {
  return (
    <Box m={2} borderRadius={2} sx={{
      border: "1px solid rgba(255, 255, 255, 0.10)",
      background: "rgba(255, 255, 255, 0.03)",
      backdropFilter: "blur(10px)",
    }}>
      <img src={imgUrl} />
    </Box>
  );
}

function HeroAnimation() {
  return (
    <Box display="flex">
      <Box display="flex" justifyContent="right">
        <Typography variant="h1">R</Typography>
      </Box>
      <Box display="flex" justifyContent="left">
        <Typography variant="h1">L</Typography>
      </Box>
    </Box>
  );
}

export default HeroAnimation;
