import React from 'react';
import IconButton from '@mui/material/IconButton';
import { FiCopy } from 'react-icons/fi';

type CopyButtonProps = {
  copyText: string;
};

function CopyButton({ copyText }: CopyButtonProps): React.JSX.Element {
  return (
    <IconButton
      size="small"
      sx={(theme) => ({
        opacity: 0.3,
        '&:hover': {
          opacity: 1,
          color: theme.palette.primary.main,
        },
      })}
      onClick={() => navigator.clipboard.writeText(copyText)}
    >
      <FiCopy style={{ fontSize: '16px' }} />
    </IconButton>
  );
}

export default CopyButton;
