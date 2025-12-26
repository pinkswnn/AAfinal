/**
 * Notion CMS placeholder.
 * Designed so you can swap later without refactoring the whole app.
 */
export type CmsPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
};

export async function listPosts(): Promise<CmsPost[]> {
  // Implement with Notion API when ready.
  return [];
}
