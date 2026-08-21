// Typed reads for every CMS document this site renders. One function per
// document, all through the shared `site` client so caching, tags, and edit
// mode behave identically everywhere.
import { site } from "./index";
import type { ImageValue } from "./sdk";

export type CmsImage = (ImageValue & { alt?: string | null }) | null;

export interface Cta {
  label?: string;
  href?: string;
}

export interface NavItem {
  _id: string;
  label: string;
  path: string;
}

export interface SiteSettings {
  metaTitle?: string;
  metaDescription?: string;
  navCta?: Cta;
  footerWordmark?: string;
  footerTagline?: string;
  footerTaglineAccent?: string;
  footerScheduleTitle?: string;
  footerScheduleLines?: string[];
  footerExploreTitle?: string;
  footerLinks?: Cta[];
  footerCredit?: { label?: string; url?: string };
}

export interface Branding {
  ogImage?: CmsImage;
  ogTitle?: string;
  ogDescription?: string;
}

export interface HomePage {
  heroEyebrow?: string;
  heroTitleLines?: string[];
  heroIntro?: string;
  heroImage?: CmsImage;
  heroPrimaryCta?: Cta;
  heroSecondaryCta?: Cta;
  marqueeWords?: string[];
  stats?: { value?: string; label?: string }[];
  missionEyebrow?: string;
  missionHeading?: string;
  missionParagraphs?: string[];
  missionLink?: Cta;
  pillarsHeading?: string;
  pillarsLinkLabel?: string;
  quote?: { text?: string; attribution?: string };
  ctaHeading?: string;
  ctaPrimary?: Cta;
  ctaSecondary?: Cta;
}

export interface Program {
  _id: string;
  number?: string;
  title: string;
  image?: CmsImage;
  cardSummary?: string;
  body?: string;
  points?: string[];
}

export interface ProgramsPage {
  metaTitle?: string;
  metaDescription?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroIntro?: string;
  ctaHeading?: string;
  ctaPrimary?: Cta;
  ctaSecondary?: Cta;
}

export interface AboutPage {
  metaTitle?: string;
  metaDescription?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroIntro?: string;
  storyHeading?: string;
  storyParagraphs?: string[];
  storyQuote?: string;
  storyClosing?: string;
  storyImage?: CmsImage;
  valuesHeading?: string;
  values?: { title?: string; body?: string }[];
  timelineHeading?: string;
  timeline?: { year?: string; title?: string; body?: string }[];
  timelineImage?: CmsImage;
}

export interface GetInvolvedPage {
  metaTitle?: string;
  metaDescription?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroIntro?: string;
  ways?: { title?: string; time?: string; body?: string }[];
  firstSaturdayHeading?: string;
  firstSaturdaySteps?: string[];
  ctaHeading?: string;
  ctaPrimary?: Cta;
  ctaSecondary?: Cta;
}

export interface DonatePage {
  metaTitle?: string;
  metaDescription?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroIntro?: string;
  tiers?: { amount?: string; body?: string }[];
  howToGiveHeading?: string;
  givingMethods?: { label?: string; url?: string }[];
  noticeHeading?: string;
  noticeParagraphs?: string[];
  ctaHeading?: string;
  ctaButton?: Cta;
}

export interface ContactPage {
  metaTitle?: string;
  metaDescription?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroIntro?: string;
  saturdayHeading?: string;
  saturdayDetails?: { label?: string; value?: string }[];
  reachHeading?: string;
  reachLinks?: { label?: string; value?: string; href?: string }[];
  goodsNote?: string;
  quote?: { text?: string; attribution?: string };
}

export interface MediaPage {
  metaTitle?: string;
  metaDescription?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroIntro?: string;
  credit?: { text?: string; linkLabel?: string; linkUrl?: string };
}

export interface MediaItem {
  _id: string;
  caption?: string;
  image?: CmsImage;
  video?: { url?: string; mime?: string } | null;
}

export const getSiteSettings = () => site.query<SiteSettings>("siteSettings").first();
export const getBranding = () => site.query<Branding>("branding").include("ogImage").first();
export const getNavItems = () => site.query<NavItem>("navItem").find();
export const getHomePage = () => site.query<HomePage>("homePage").include("heroImage").first();
export const getProgramsPage = () => site.query<ProgramsPage>("programsPage").first();
export const getMediaPage = () => site.query<MediaPage>("mediaPage").first();
export const getMediaItems = () =>
  site.query<MediaItem>("mediaItem").include("image", "video").find();
export const getAboutPage = () =>
  site.query<AboutPage>("aboutPage").include("storyImage", "timelineImage").first();
export const getGetInvolvedPage = () => site.query<GetInvolvedPage>("getInvolvedPage").first();
export const getDonatePage = () => site.query<DonatePage>("donatePage").first();
export const getContactPage = () => site.query<ContactPage>("contactPage").first();

// Sorted by the display number so the studio's drag order can't scramble the
// numbered layout — "01", "02", "03" sort lexicographically.
export const getPrograms = async (): Promise<Program[]> => {
  const programs = await site.query<Program>("program").include("image").find();
  return programs.sort((a, b) => (a.number ?? "").localeCompare(b.number ?? ""));
};
