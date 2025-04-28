import React from "react";
import { Box } from "@mui/material";

const imgContainerStyles = {
  border: "1px solid rgba(255, 255, 255, 0.10)",
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(42px)",
};

const rotatingBackgroundStyles = {
  position: "absolute",
  zIndex: 0,
  objectFit: "cover",
  animation: "rotateBg 20s linear infinite",
  top: "50%",
  left: "50%",
  width: "150%",
  height: "150%",
  transformOrigin: "center center",
  maxWidth: "none",
  maxHeight: "none",
  "@keyframes rotateBg": {
    "0%": {
      transform: "translate(-50%, -50%) rotate(0deg)",
    },
    "100%": {
      transform: "translate(-50%, -50%) rotate(360deg)",
    },
  },
};

function ImgContainer({ imgUrl, width, height }: { imgUrl: string, width: number, height: number }) {
  return (
    <Box
      p={2}
      borderRadius={2}
      sx={imgContainerStyles}
    >
      <Box
        component="img"
        src={imgUrl}
        width={width}
        height={height}
        sx={{
          objectFit: 'contain'
        }}
      ></Box>
    </Box>
  );
}

function HeroAnimation() {
  return (
    <Box display="flex" flex={1} gap={2} position="relative" overflow="hidden" padding={8}>
      <Box
        component="img"
        src="img/home-page/anim-blocks.webp"
        alt=""
        sx={rotatingBackgroundStyles}
      />
      <Box display="flex" gap={2}>
        <Box display="flex" flexDirection="column" gap={2} justifyContent="right" minWidth={168}>
          <Box display="flex" justifyContent="flex-end">
            <ImgContainer imgUrl="img/home-page/anim-api.svg" width={88} height={88} />
          </Box>
          <ImgContainer imgUrl="img/home-page/anim-snapshot.svg" width={168} height={172} />
        </Box>
        <Box display="flex" flexDirection="column" gap={2} justifyContent="left" mt={5}>
          <Box display="flex" justifyContent="flex-start">
            <ImgContainer imgUrl="img/home-page/anim-rpc.svg" width={168} height={129} />
          </Box>
          <ImgContainer imgUrl="img/home-page/anim-guide.svg" width={229} height={139} />
        </Box>
      </Box>
    </Box>
  );
}

export default HeroAnimation;
