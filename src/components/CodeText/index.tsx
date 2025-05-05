import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type Props = {
  text: string;
}

function CodeText({ text }: Props) {
  return (
    <Box
      paddingY={0.5}
      paddingX={1}
      borderRadius={2}
      sx={{
        backgroundColor: '#20222C',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontFamily: 'Consolas, monospace',
          fontSize: '15px',
          fontWeight: 400,
          fontStyle: 'normal',
          lineHeight: '16px',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default CodeText;
