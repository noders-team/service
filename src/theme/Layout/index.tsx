import React, { type ReactNode } from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof LayoutType> & {
  children?: ReactNode;
};

export default function LayoutWrapper(props: Props): ReactNode {
  return (
    <>
      <Layout {...props}>{props.children}</Layout>
    </>
  );
}
