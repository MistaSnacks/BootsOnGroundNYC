import { cms } from "./sdk";

const project = process.env.NEXT_PUBLIC_SNACKBOX_PROJECT;
if (!project) throw new Error("NEXT_PUBLIC_SNACKBOX_PROJECT is not set — see .env.example");

// The SnackBox client for this site. Usage:
//   const items = await site.query("galleryItem").include("images").find();
// Always .include() any image/reference field so the API resolves it to a URL.
//
// editMode: when Next draft mode is on (an editor arrived via
// /api/snackbox-edit), reads become uncached and stega-annotated so the
// overlay can map on-page content to CMS fields — and, with the edit-token
// cookie that bootstrap set, they read the draft perspective, so the editor
// previews unpublished changes in place. Public rendering never takes this
// branch, and drafts are token-gated by the CMS on top.
export const site = cms(project, {
  editMode: async () => {
    try {
      const { draftMode, cookies } = await import("next/headers");
      if (!(await draftMode()).isEnabled) return false;
      return (await cookies()).get("sbx-edit-token")?.value ?? true;
    } catch {
      return false; // browser or non-request scope
    }
  },
});
export { cms };
// Form spam guard — put these on every intake form. See the README's "Forms"
// section; formGuardFields() must be captured at render time, not on submit.
export { formGuardFields, honeypotInputProps, HONEYPOT_FIELD, RENDERED_AT_FIELD, SnackboxError } from "./sdk";
export type { FormGuardFields } from "./sdk";
