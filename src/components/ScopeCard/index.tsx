import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

type Props = {
  scope: string;
}

function ScopeCard({ scope }: Props) {
  const theme = useTheme();
  const color = scope.toLowerCase() == 'mainnet' ? theme.palette.success.main : theme.palette.warning.main;

  return (
    <Box
      paddingY={0.5}
      paddingX={1}
      borderRadius={2}
      sx={{
        backgroundColor: alpha(color, 0.4),
        border: `1px solid ${alpha(color, 0.2)}`,
      }}
    >
      <Typography
        variant="body2"
        color={color}
        sx={{
          fontFamily: 'var(--font-family-monospace)',
          fontSize: '15px',
          fontWeight: 400,
          fontStyle: 'normal',
          lineHeight: '16px',
        }}
      >
        {scope}
      </Typography>
    </Box>
  );
}

export default ScopeCard;
