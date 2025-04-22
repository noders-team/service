import React from "react";
import { Box } from "@mui/material";
import useBaseUrl from "@docusaurus/useBaseUrl";

function ImgContainer({ imgUrl, width, height }: { imgUrl: string, width: number, height: number }) {
  const imageSrc = useBaseUrl(imgUrl);

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
        src={imageSrc}
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
    <Box display="flex" gap={2}>
      <Box display="flex" flexDirection="column" gap={2} justifyContent="right" minWidth={168}>
        <Box display="flex" justifyContent="flex-end">
          <ImgContainer imgUrl={useBaseUrl("img/home-page/anim-api.svg")} width={88} height={88} />
        </Box>
        <ImgContainer imgUrl={useBaseUrl("img/home-page/anim-snapshot.svg")} width={168} height={172} />
      </Box>
      <Box display="flex" flexDirection="column" gap={2} justifyContent="left" mt={5}>
        <Box display="flex" justifyContent="flex-start">
          <ImgContainer imgUrl={useBaseUrl("img/home-page/anim-rpc.svg")} width={168} height={129} />
        </Box>
        <ImgContainer imgUrl={useBaseUrl("img/home-page/anim-guide.svg")} width={229} height={139} />
      </Box>
    </Box>
  );
}

export default HeroAnimation;
