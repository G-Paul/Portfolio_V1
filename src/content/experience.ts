import type { LogoKey } from "@/components/logos";

/**
 * Cards for the timeline on the home page, newest first.
 *
 * `to` is optional: leave it out for a role you are still in and the card
 * shows "Present". `logo` names one of the outline marks in
 * [src/components/logos.tsx]; they stroke in the theme purple.
 */
export type Role = {
  company: string;
  title: string;
  from: string;
  to?: string;
  logo?: LogoKey;
};

export const roles: Role[] = [
  {
    company: "Eyecandy Robotics",
    title: "Founding Robotics Engineer",
    from: "Apr'26",
    logo: "eyecandy",
  },
  {
    company: "FPV Labs",
    title: "Founding Engineer - Hardware",
    from: "Oct'25",
    to: "Apr'26",
    logo: "fpv",
  },
  {
    company: "TransUnion",
    title: "Associate Developer",
    from: "Feb'24",
    to: "Oct'25",
    logo: "transunion",
  },
];
