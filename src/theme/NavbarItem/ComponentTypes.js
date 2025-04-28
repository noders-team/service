/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import NavBarSocialLinks from '../../components/NavBarSocialLinks/NavBarSocialLinks';
import NavBarLinks from "@/components/NavBarLinks";

export default {
  ...ComponentTypes,
  'custom-navbar-item-social-links': NavBarSocialLinks,
  'custom-navbar-item-links': NavBarLinks,
};
