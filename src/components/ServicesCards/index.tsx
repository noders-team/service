import React from "react";
import Box from "@mui/material/Box";

function ImgContainer({ imgUrl, width, height }: { imgUrl: string, width: number, height: number }) {
  return (
    <Box
      p={2}
      borderRadius={2}
      sx={{
        border: "1px solid rgba(255, 255, 255, 0.10)",
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(42px)",
      }}
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

function ServicesCards() {
  return (
    <Box display="flex" flex={1} gap={2} paddingY={3} paddingX={8}>
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

export default ServicesCards;
