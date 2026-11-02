export interface AchievementItem {
  id: string;
  title: string;
  category: 'certification' | 'competition' | 'award' | 'publication' | 'academic';
  issuerOrOrganization: string;
  dateOrYear: string;
  credentialUrl?: string;
  description: string;
  verified: boolean;
}

/**
 * Verified Achievements & Certifications
 * IMPORTANT RULE: Only show actual verified information.
 * Do not invent achievements, awards, or certificates.
 * When empty, the section automatically hides itself.
 */
export const achievementsData: AchievementItem[] = [
  // Populated as soon as verified certificates or awards are provided.
];

export const hasVerifiedAchievements = achievementsData.length > 0;
