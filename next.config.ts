import type { NextConfig } from "next";
import { withSnackbox } from "./lib/cms/next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSnackbox(nextConfig);
