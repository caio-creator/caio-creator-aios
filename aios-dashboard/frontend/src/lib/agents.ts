export interface AgentConfig {
  id: string;
  name: string;
  icon: string;
  color: string;
  suggestedPrompts: string[];
}

export const agents: AgentConfig[] = [
  {
    id: 'copy',
    name: 'Copy Agent',
    icon: '✏',
    color: '#6E56CF',
    suggestedPrompts: [
      'Write a killer Instagram caption',
      'Create a LinkedIn post',
      'Generate WhatsApp message variants',
    ],
  },
  {
    id: 'sales',
    name: 'Sales Agent',
    icon: '💼',
    color: '#F59E0B',
    suggestedPrompts: [
      'Create a proposal',
      'Suggest pricing structure',
      'Write follow-up sequences',
    ],
  },
  {
    id: 'pitch',
    name: 'Pitch Agent',
    icon: '◎',
    color: '#3B82F6',
    suggestedPrompts: [
      'Create an elevator pitch',
      'Write deck speaker notes',
      'Develop a case study narrative',
    ],
  },
  {
    id: 'briefing',
    name: 'Briefing Agent',
    icon: '◈',
    color: '#22C55E',
    suggestedPrompts: [
      'Create a creative brief',
      'Write Statement of Work',
      'Generate kickoff agenda',
    ],
  },
  {
    id: 'brand',
    name: 'Brand Agent',
    icon: '◉',
    color: '#EC4899',
    suggestedPrompts: [
      'Create brand guidelines',
      'Develop voice & tone guide',
      'Write visual direction narrative',
    ],
  },
];

export function getAgent(id: string): AgentConfig | undefined {
  return agents.find(a => a.id === id);
}
