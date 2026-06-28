/**
 * Site content — customize text here.
 *
 * PHOTOS: hero.jpg + up to 12 memory photos in assets/photos/
 * Edit paths, captions, and timeline text below. Remove memory entries you don't use.
 */

const SITE_DATA = {
  hero: {
    src: 'assets/photos/hero.jpg',
    alt: 'Divya — beautiful birthday girl'
  },

  heroTypingLines: [
    'Twenty years of beautiful memories,',
    'smiles,',
    'growth,',
    'kindness,',
    'and happiness.'
  ],

  /** Gallery & carousel — add 10–12 photos here (each needs a unique id) */
  memories: [
    {
      id: 'm1',
      src: 'assets/photos/childhood-1.jpg',
      alt: 'Little Divya — early childhood',
      caption: 'So tiny, so precious 🌸'
    },
    {
      id: 'm2',
      src: 'assets/photos/childhood-2.jpg',
      alt: 'Young Divya — childhood',
      caption: 'Even then, all smiles'
    },
    {
      id: 'm3',
      src: 'assets/photos/childhood-3.jpg',
      alt: 'Divya growing up',
      caption: 'Those beautiful childhood days'
    },
    {
      id: 'm4',
      src: 'assets/photos/age-18-a.jpg',
      alt: 'Divya at eighteen',
      caption: 'Eighteen and absolutely glowing ✨'
    },
    {
      id: 'm5',
      src: 'assets/photos/age-18-b.jpg',
      alt: 'Divya — age eighteen memories',
      caption: 'More magic at eighteen'
    },
    {
      id: 'm6',
      src: 'assets/photos/age-19.jpg',
      alt: 'Divya at nineteen',
      caption: 'Nineteen looked so good on you 💜'
    },
    {
      id: 'm7',
      src: 'assets/photos/memory-7.jpg',
      alt: 'A favourite memory',
      caption: 'A moment worth keeping forever'
    },
    {
      id: 'm8',
      src: 'assets/photos/memory-8.jpg',
      alt: 'Another beautiful memory',
      caption: 'Smiles that never fade'
    },
    {
      id: 'm9',
      src: 'assets/photos/memory-9.jpg',
      alt: 'Special memory',
      caption: 'Pure happiness'
    },
    {
      id: 'm10',
      src: 'assets/photos/memory-10.jpg',
      alt: 'Special memory',
      caption: 'So much joy in one picture'
    },
    {
      id: 'm11',
      src: 'assets/photos/memory-11.jpg',
      alt: 'Special memory',
      caption: 'Another chapter of your story'
    },
    {
      id: 'm12',
      src: 'assets/photos/memory-12.jpg',
      alt: 'Special memory',
      caption: 'Twenty years of wonderful you'
    }
  ],

  /**
   * Timeline milestones.
   * Use `memoryId` to pull the photo from `memories` (keeps gallery & timeline in sync).
   * Text-only items: use `emoji` instead of `memoryId`.
   */
  timeline: [
    {
      label: '2006',
      title: 'Welcome to the world',
      description: 'The day everything became a little brighter. 🌸',
      memoryId: 'm1'
    },
    {
      label: 'Little One',
      title: 'Early childhood',
      description: 'Tiny hands, the sweetest smile — the beginning of someone extraordinary.',
      memoryId: 'm1'
    },
    {
      label: '2008 – 2015',
      title: 'Growing years',
      description: 'School days, laughter, curiosity, and a heart that kept getting bigger.',
      memoryId: 'm3'
    },
    {
      label: 'Childhood',
      title: 'Spreading joy',
      description: 'Every room you walked into felt a little warmer.',
      memoryId: 'm2'
    },
    {
      label: 'Memories',
      title: 'Those beautiful days',
      description: 'Growing up with kindness, grace, and that unforgettable smile.',
      memoryId: 'm3'
    },
    {
      label: '2016 – 2023',
      title: 'Finding yourself',
      description: 'Teen years of dreams, friendships, and becoming the amazing person you are.',
      memoryId: 'm6'
    },
    {
      label: 'Age 18 · 2024',
      title: 'Eighteen',
      description: 'A new chapter — confident, beautiful, and ready for the world.',
      memoryId: 'm4'
    },
    {
      label: '18',
      title: 'More moments at eighteen',
      description: 'Every picture holds a story worth keeping forever.',
      memoryId: 'm5'
    },
    {
      label: 'Age 19 · 2025',
      title: 'Nineteen',
      description: 'One year closer to twenty — and more wonderful than ever.',
      memoryId: 'm6'
    },
    {
      label: 'More memories',
      title: 'Moments we love',
      description: 'Every photo is a little piece of your beautiful story.',
      memoryId: 'm7'
    },
    {
      label: 'Together',
      title: 'Laughter & love',
      description: 'The kind of memories that make life feel magical.',
      memoryId: 'm8'
    },
    {
      label: 'Always',
      title: 'Your smile',
      description: 'The one thing that never changes — and never stops shining.',
      memoryId: 'm9'
    },
    {
      label: 'Forever',
      title: 'Precious times',
      description: 'Held close, remembered always.',
      memoryId: 'm10'
    },
    {
      label: 'Beautiful',
      title: 'More of you',
      description: 'Twenty years of grace, kindness, and light.',
      memoryId: 'm11'
    },
    {
      label: 'Favourites',
      title: 'One more smile',
      description: 'Because every picture of you is worth keeping.',
      memoryId: 'm12'
    },
    {
      label: '2026',
      title: 'Twenty years of you',
      description: 'Happy 20th Birthday, Divya. Here\'s to everything ahead. 🎂❤️',
      emoji: '🎂'
    }
  ],

  reasons: [
    { emoji: '✨', text: 'Your smile lights up every room.' },
    { emoji: '🦋', text: 'Your kindness makes people feel at home.' },
    { emoji: '🌸', text: 'You always know how to make everyone laugh.' },
    { emoji: '💜', text: "You're stronger than you realize." },
    { emoji: '🌷', text: 'Thank you for being you.' },
    { emoji: '💖', text: 'Your heart is pure gold.' },
    { emoji: '🌟', text: 'You inspire everyone around you.' },
    { emoji: '🎀', text: 'You make ordinary days feel magical.' }
  ],

  wishes: [
    'May all your dreams come true.',
    'Stay happy forever.',
    'Never stop smiling.',
    'Keep shining.',
    'Lots of happiness.',
    'Love.',
    'Success.',
    'Health.',
    'Peace.',
    'Endless adventures.',
    'Beautiful surprises.',
    'All the joy in the world.'
  ],

  quotes: [
    'Some people make the world brighter just by existing.',
    'Friendship makes ordinary days magical.',
    'You deserve every happiness.',
    'The world is better because you are in it.',
    'Your light touches everyone you meet.',
    'Twenty years of wonderful — here\'s to many more.',
    'Kindness looks beautiful on you.',
    'You are loved more than you know.'
  ]
};
