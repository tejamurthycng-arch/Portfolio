export type ExperienceType = 
  | 'hackathon' 
  | 'workshop' 
  | 'internship' 
  | 'technical_event' 
  | 'research';

export interface HackathonExperience {
  id: string;
  type: ExperienceType;
  title: string;
  organizer: string;
  dateOrYear: string;
  participationStatus: 'Participant' | 'Finalist' | 'Winner' | 'Completed' | 'Attendee';
  eventCategory: string;
  themeOrProblem?: string;
  teamInfo?: string;
  learningDescription: string; // Professional 2-line description of what was learned
  certificatePdfUrl?: string; // e.g., '/certificates/hackathon-cert.pdf'
  certificateThumbnail?: string;
  verified: boolean;
  tags: string[];
}

/**
 * Verified Hackathons & Experience List
 * IMPORTANT: This data strictly mirrors verified events & uploaded certificates.
 * When you upload a new certificate PDF into `public/certificates/`, add the entry here.
 */
export const hackathonsAndExperience: HackathonExperience[] = [
  /* 
   * Ready for Tejamurthy's uploaded PDF certificates!
   * Examples of the verified schema format:
   * {
   *   id: 'hackathon-1',
   *   type: 'hackathon',
   *   title: 'Smart City Hackathon',
   *   organizer: 'BMSCE Innovation Hub',
   *   dateOrYear: '2025',
   *   participationStatus: 'Participant',
   *   eventCategory: 'Civic Tech & AI',
   *   themeOrProblem: 'Urban infrastructure sensing and hazard reporting',
   *   learningDescription: 'Explored real-time sensor processing and rapid prototype development under tight sprint constraints.\nGained hands-on experience in cross-functional ideation and pitching engineering solutions.',
   *   certificatePdfUrl: '/certificates/smart-city-hackathon.pdf',
   *   verified: true,
   *   tags: ['Civic Tech', 'YOLOv8', 'Rapid Prototyping']
   * }
   */
];

// Helper to determine if there are currently verified hackathons or if awaiting certificate uploads
export const hasVerifiedHackathons = hackathonsAndExperience.length > 0;
