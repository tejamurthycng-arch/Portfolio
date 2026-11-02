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
  certificatePdfUrl?: string; // e.g., '/certificates/the-beginner-hackathon.pdf'
  certificateThumbnail?: string;
  verified: boolean;
  tags: string[];
}

/**
 * Verified Hackathons & Experience List
 * Accurately updated with Tejamurthy's verified participation certificate:
 * "The Beginner Hackathon" - March 5, 2026, Protocol Club, BMSCE.
 */
export const hackathonsAndExperience: HackathonExperience[] = [
  {
    id: 'the-beginner-hackathon-2026',
    type: 'hackathon',
    title: 'The Beginner Hackathon',
    organizer: 'Protocol Club, Department of CSE, BMSCE',
    dateOrYear: 'March 5, 2026',
    participationStatus: 'Participant',
    eventCategory: 'Hackathon & Rapid Prototyping',
    themeOrProblem: 'Algorithmic problem solving, teamwork, and software innovation under timed sprint constraints',
    learningDescription: 'Collaborated with peers in an intensive sprint hosted by BMSCE\'s Protocol Club to brainstorm and prototype functional software under time limits.\nStrengthened hands-on technical development workflows, team synergy, and rapid problem decomposition.',
    certificatePdfUrl: '/certificates/the-beginner-hackathon.pdf',
    verified: true,
    tags: ['Protocol Club', 'BMSCE CSE', 'Rapid Prototyping', 'Teamwork', 'Algorithms']
  }
];

export const hasVerifiedHackathons = hackathonsAndExperience.length > 0;
