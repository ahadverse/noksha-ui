import { AvatarFallback, AvatarGroup, AvatarImage, AvatarRoot } from '@prism-ui/react';

const TEAM = [
  { id: 12, name: 'Ada Lovelace', initials: 'AL' },
  { id: 32, name: 'Grace Hopper', initials: 'GH' },
  { id: 52, name: 'Katherine Johnson', initials: 'KJ' },
  { id: 60, name: 'Radia Perlman', initials: 'RP' },
  { id: 15, name: 'Barbara Liskov', initials: 'BL' },
];

export default function AvatarGroupDemo() {
  return (
    <AvatarGroup max={3} size="md">
      {TEAM.map((person) => (
        <AvatarRoot key={person.id}>
          <AvatarImage src={`https://i.pravatar.cc/120?img=${person.id}`} alt={person.name} />
          <AvatarFallback>{person.initials}</AvatarFallback>
        </AvatarRoot>
      ))}
    </AvatarGroup>
  );
}
