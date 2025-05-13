import Box from '@mui/material/Box';
import React from 'react';
import Typography from '@mui/material/Typography';
import { Highlight, themes } from 'prism-react-renderer';

type Props = {
  api: string;
  rpc: string;
  grpc: string;
  jsonRpc: string;
};

function EndpointBlock({ label, url }: { label: string; url: string }) {
  if (!url) return null;
  return (
    <Box>
      <Typography variant="h4" sx={{ mt: 2, mb: 1, fontSize: "32px", fontWeight: 700 }}>
        {label}
      </Typography>
      <Highlight code={url} theme={themes.dracula} language="bash">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{ ...style, borderRadius: 8, padding: '12px 16px', margin: 0, fontSize: 14 }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Box>
  );
}

function Endpoints({ api, rpc, grpc, jsonRpc }: Props): React.JSX.Element {
  return (
    <Box display="flex" flexDirection="column" gap={2} pt={2}>
      {api && <EndpointBlock label="REST API" url={api} />}
      {rpc && <EndpointBlock label="RPC" url={rpc} />}
      {grpc && <EndpointBlock label="gRPC" url={grpc} />}
      {jsonRpc && <EndpointBlock label="JSON-RPC" url={jsonRpc} />}
    </Box>
  );
}

export default Endpoints;
