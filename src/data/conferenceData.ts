import type { Speaker, Committee, DaySchedule } from '../types';
import conference from './conference.json';
import committees from './committees.json';

// Shared public content only. Credentials belong in server environment variables.
export const CONFERENCE_INFO = conference;
export const COMMITTEES_DATA = committees as Committee[];
export const SPEAKERS_DATA: Speaker[] = [{
  id: 'speaker-1', name: 'Speaker to be announced', role: 'Guest Speaker',
  organization: 'To be announced', topic: 'Keynote topic to be announced',
  bio: 'Guest speaker details will be shared here.',
  image: '/images/conference-logo.svg', chamber: 'Opening Ceremony'
}];
export const SCHEDULE_DATA: DaySchedule[] = [1, 2, 3].map(day => ({
  day, title: `DAY 0${day}`, theme: 'DIPLOMACY & DIALOGUE', date: 'Date to be announced',
  sessions: [{ time: 'TBA', title: day === 1 ? 'Opening Ceremony' : day === 3 ? 'Closing Ceremony' : 'Committee Sessions', location: 'To be announced', type: 'plenary', description: 'The detailed programme will be announced soon.' }]
}));
export const VENUE_INFO = {
  title: 'Conference Venue', subtitle: 'A place for dialogue and collaboration',
  city: conference.city, address: 'Venue address to be announced',
  description: 'Venue details and travel information will be shared here.',
  highlights: ['Ceremony Hall', 'Committee Rooms', 'Social Spaces', 'Transport & Accommodation'].map(title => ({ title, desc: 'Details to be announced.' }))
};

// Keep both welcome letters; customize their authors and copy for each conference.
export const CONFERENCE_LETTERS = [
  {
    name: 'Secretary-General Name',
    role: 'Conference Host',
    title: 'A voice for every delegate.',
    paragraphs: [
      'Dear Delegates, Advisors, and Distinguished Guests,',
      'It is a pleasure to welcome you to our conference. Our conference begins with a simple belief: every voice can bring a new perspective, and every conversation can become the start of meaningful change.',
      'As we come together at our conference, we invite you to challenge your assumptions, listen with curiosity, and approach each debate with courage and respect. The ideas you share and the friendships you build will make this experience your own.',
      'We look forward to welcoming you to our community and writing this chapter together.'
    ]
  },
  {
    name: 'Director-General Name',
    role: 'Conference Host',
    title: 'Together, beyond the debate.',
    paragraphs: [
      'Dear Members of the conference community,',
      'Welcome to a gathering built on collaboration, imagination, and the willingness to understand one another. Our conference is an invitation to explore difficult questions and discover what we can achieve together.',
      'Whether this is your first committee or your next diplomatic adventure, we hope you find the confidence to speak, the patience to listen, and the inspiration to keep learning. Every resolution begins with people choosing to work side by side.',
      'We are excited to meet you at our conference and share a memorable experience of debate, discovery, and friendship.'
    ]
  }
];
