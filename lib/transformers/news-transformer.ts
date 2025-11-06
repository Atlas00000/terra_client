/**
 * News Transformer
 * 
 * Transforms backend NewsStoryDTO to frontend format used in components.
 * Ensures backward compatibility with existing static data structure.
 */

import { NewsStoryDTO } from '@/types/api';

/**
 * Frontend news item format (used by slideshow components)
 */
export interface FrontendNewsItem {
  title: string;
  subtitle: string;
  content: string;
  visual?: string;
  items?: Array<{
    title: string;
    description: string;
    details: string[];
    impact: string;
  }>;
}

/**
 * Transform backend NewsStoryDTO to frontend format
 * 
 * This transformer ensures that dynamic data from the backend
 * works seamlessly with the existing component structure.
 * 
 * @param story - NewsStoryDTO from backend API
 * @returns FrontendNewsItem for use in components
 */
export function transformNewsStory(story: NewsStoryDTO): FrontendNewsItem {
  // Base transformation
  const transformed: FrontendNewsItem = {
    title: story.title,
    subtitle: story.category || 'Company News',
    content: story.excerpt || extractExcerpt(story.content),
    visual: story.featuredImage?.publicUrl,
  };

  // Parse content for structured items (if formatted as list)
  // This allows admins to create rich news content in the CMS
  const items = parseContentItems(story.content);
  if (items.length > 0) {
    transformed.items = items;
  }

  return transformed;
}

/**
 * Extract excerpt from content if not provided
 * Takes first 200 characters and adds ellipsis
 */
function extractExcerpt(content: string, maxLength: number = 200): string {
  if (!content) return '';
  
  // Remove HTML tags if any
  const plainText = content.replace(/<[^>]*>/g, '');
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).trim() + '...';
}

/**
 * Parse content into structured items
 * 
 * Looks for markdown-style sections in content:
 * ## Item Title
 * Description text
 * - Detail 1
 * - Detail 2
 * **Impact:** Impact text
 * 
 * This allows CMS admins to create rich structured content
 */
function parseContentItems(content: string): Array<{
  title: string;
  description: string;
  details: string[];
  impact: string;
}> {
  const items: Array<{
    title: string;
    description: string;
    details: string[];
    impact: string;
  }> = [];

  // Simple regex-based parsing (can be enhanced with markdown parser)
  const sections = content.split(/^##\s+/m).filter(s => s.trim());
  
  sections.forEach(section => {
    const lines = section.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length === 0) return;

    const title = lines[0];
    let description = '';
    const details: string[] = [];
    let impact = '';

    let currentMode: 'description' | 'details' | 'impact' = 'description';

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];

      // Check for impact marker
      if (line.startsWith('**Impact:**') || line.startsWith('Impact:')) {
        currentMode = 'impact';
        impact = line.replace(/\*\*Impact:\*\*|\*Impact:\*/g, '').trim();
        continue;
      }

      // Check for list items (details)
      if (line.startsWith('- ') || line.startsWith('* ')) {
        currentMode = 'details';
        details.push(line.substring(2).trim());
        continue;
      }

      // Regular paragraph - add to description
      if (currentMode === 'description') {
        description += (description ? ' ' : '') + line;
      }
    }

    if (title) {
      items.push({
        title,
        description: description || title, // Fallback to title
        details: details.length > 0 ? details : [description || 'Details coming soon'],
        impact: impact || 'Strategic initiative for Terra Industries',
      });
    }
  });

  return items;
}

/**
 * Transform array of news stories
 */
export function transformNewsStories(stories: NewsStoryDTO[]): FrontendNewsItem[] {
  return stories.map(transformNewsStory);
}

/**
 * Sort news stories by publish date (newest first)
 */
export function sortNewsByDate(stories: NewsStoryDTO[]): NewsStoryDTO[] {
  return [...stories].sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.createdAt);
    const dateB = new Date(b.publishedAt || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Filter published stories only
 */
export function filterPublishedNews(stories: NewsStoryDTO[]): NewsStoryDTO[] {
  return stories.filter(story => story.status === 'published');
}

