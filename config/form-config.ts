import type { FormQuestion, FormConfig } from '~/types/form'

export const formConfig: FormConfig = {
  questions: {
    mainChallenge: {
      id: 'mainChallenge',
      title: `What's the main thing holding you back in your business right now?`,
      type: 'radio',
      options: [
        { label: 'Not sure where to start', value: 'not_sure' },
        { label: 'Struggling to find clients', value: 'finding_clients' },
        { label: `Can't stay consistent/motivated`, value: 'consistency' },
        { label: 'Overwhelmed with too much to do', value: 'overwhelmed' },
        { label: 'Not making enough money', value: 'revenue' },
        { label: 'Other', value: 'other' }
      ],
      otherField: {
        id: 'mainChallengeOther',
        placeholder: 'Tell us more...',
        rows: 3
      },
      required: true
    },
    businessStage: {
      id: 'businessStage',
      title: `Which best describes where you're at?`,
      type: 'radio',
      options: [
        { label: 'Just starting out (idea phase)', value: 'idea_phase' },
        { label: 'Getting first clients', value: 'first_clients' },
        { label: 'Making some money but want more', value: 'growth_phase' },
        { label: 'Ready to scale up', value: 'scaling' }
      ],
      required: true
    },
    businessType: {
      id: 'businessType',
      title: `What type of business are you building?`,
      type: 'radio',
      options: [
        { label: 'Service-based', value: 'service' },
        { label: 'Digital products/courses', value: 'digital_products' },
        { label: 'E-commerce', value: 'ecommerce' },
        { label: 'Coaching/consulting', value: 'coaching' },
        { label: 'Software/tech', value: 'software' },
        { label: 'Other', value: 'other' }
      ],
      otherField: {
        id: 'businessTypeOther',
        placeholder: 'Tell us more about your business...',
        rows: 3
      },
      required: true
    },
    goal: {
      id: 'goal',
      title: `What's your biggest goal for the next 12 months?`,
      type: 'radio',
      options: [
        { label: 'Launch something new', value: 'launch' },
        { label: 'Hit my first $10k month', value: '10k_month' },
        { label: 'Build a reliable system', value: 'build_system' },
        { label: 'Create a team', value: 'create_team' },
        { label: 'Other', value: 'other' }
      ],
      otherField: {
        id: 'goalOther',
        placeholder: 'Tell us about your goal...',
        rows: 3
      },
      required: true
    },
    goalMeaning: {
      id: 'goalMeaning',
      title: `What would achieving this goal mean for you?`,
      type: 'textarea',
      placeholder: `Share how achieving this goal would impact your life and business... Example: "I'd be able to quit my job and focus on my business full-time."`,
      rows: 4,
      required: true
    },
    contactInfo: {
      id: 'contactInfo',
      title: `Let's create your personalized action plan.`,
      type: 'contact',
      fields: [
        {
          id: 'name',
          type: 'text',
          placeholder: 'First Name',
          autocomplete: 'given-name',
          required: true
        },
        {
          id: 'email',
          type: 'email',
          placeholder: 'Email Address',
          autocomplete: 'email',
          required: true
        }
      ],
      required: true
    },
    skillRatings: {
      id: 'skillRatings',
      title: 'Rate Your Entrepreneurial Skills',
      type: 'rating_block',
      questions: [
        {
          id: 'findingIdeas',
          title: 'Finding Ideas',
          required: true
        },
        {
          id: 'sellingIdeas',
          title: 'Selling Ideas',
          required: true
        },
        {
          id: 'buildingIdeas',
          title: 'Building Ideas',
          required: true
        },
        {
          id: 'growingIdeas',
          title: 'Growing Ideas',
          required: true
        }
      ],
      required: true
    },
    discProfile: {
      id: 'discProfile',
      title: `Do you know your DISC profile?`,
      type: 'radio',
      options: [
        { label: 'Yes - I know my DISC profile', value: 'yes' },
        { label: 'No - What is DISC?', value: 'no' },
        { label: `Not sure - I've heard of it but don't remember mine`, value: 'not_sure' }
      ],
      required: true
    }
  },
  flow: [
    'mainChallenge',
    'businessStage',
    'businessType',
    'goal',
    'goalMeaning',
    'contactInfo',
    'skillRatings',
    'discProfile'
  ],
  discAssessment: {
    questions: [
      {
        id: 'discQ1',
        question: `When tackling a new business challenge, you typically:`,
        options: [
          { label: 'Take charge and make quick decisions', value: 'D' },
          { label: 'Get others excited and involved in solutions', value: 'I' },
          { label: 'Take time to analyze all options carefully', value: 'C' },
          { label: 'Work steadily and maintain harmony', value: 'S' }
        ]
      },
      {
        id: 'discQ2',
        question: `Your preferred way of getting things done is:`,
        options: [
          { label: 'Taking control and pushing for results', value: 'D' },
          { label: 'Inspiring others and making it fun', value: 'I' },
          { label: 'Following established processes precisely', value: 'C' },
          { label: 'Being consistent and supporting the team', value: 'S' }
        ]
      },
      {
        id: 'discQ3',
        question: `Under pressure, you typically:`,
        options: [
          { label: 'Become more direct and take charge', value: 'D' },
          { label: 'Talk things through with others', value: 'I' },
          { label: 'Focus harder on getting details right', value: 'C' },
          { label: 'Maintain calm and seek harmony', value: 'S' }
        ]
      },
      {
        id: 'discQ4',
        question: `Your communication style could be described as:`,
        options: [
          { label: 'Brief, direct, and focused on results', value: 'D' },
          { label: 'Energetic, optimistic, and persuasive', value: 'I' },
          { label: 'Precise, systematic, and logical', value: 'C' },
          { label: 'Diplomatic, steady, and supportive', value: 'S' }
        ]
      },
      {
        id: 'discQ5',
        question: `When starting a new project:`,
        options: [
          { label: 'Focus on the goal and push forward', value: 'D' },
          { label: 'Generate excitement and possibilities', value: 'I' },
          { label: 'Create detailed plans and systems', value: 'C' },
          { label: 'Establish a steady, comfortable pace', value: 'S' }
        ]
      }
    ],
    styles: [
      { label: 'D (Direct/Decisive)', value: 'D' },
      { label: 'I (Influencing/Interactive)', value: 'I' },
      { label: 'S (Steady/Supportive)', value: 'S' },
      { label: 'C (Cautious/Calculating)', value: 'C' }
    ]
  }
} 