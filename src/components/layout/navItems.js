import {
  IconHome,
  IconUser,
  IconBriefcase,
  IconPackage,
  IconMail,
} from "@/components/ui/icons";

/**
 * Single source of truth for navigation.
 * Desktop top bar and mobile bottom bar both render from this list.
 */
export const NAV_ITEMS = [
  { id: "home", href: "/", icon: IconHome },
  { id: "about", href: "/about", icon: IconUser },
  { id: "work", href: "/work", icon: IconBriefcase },
  { id: "resources", href: "/resources", icon: IconPackage },
  { id: "contact", href: "/contact", icon: IconMail },
];

