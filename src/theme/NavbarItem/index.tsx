import React from 'react';
import OriginalNavbarItem from '@theme-original/NavbarItem';
import NavBarSocialLinks from '@/components/NavBarSocialLinks/NavBarSocialLinks';
import NavBarLinks from "@/components/NavBarLinks";

interface NavbarItemProps {
  type?: string;
  mobile?: boolean;
  [key: string]: any;
}

export default function NavbarItemWrapper(props: NavbarItemProps): JSX.Element {
  if (props.type === 'custom-navbar-item-links') {
    return <NavBarLinks {...props} />
  }
  if (props.type === 'custom-navbar-item-social-links') {
    return <NavBarSocialLinks {...props} />;
  }
  return <OriginalNavbarItem {...props} />;
}
