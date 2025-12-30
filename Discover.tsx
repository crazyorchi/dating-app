import { mockPeople } from '../data/mockData';
import { SwipeCards } from './SwipeCards';
import { Person } from '../types';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface DiscoverProps {
  onBack?: () => void;
  onPersonSelect: (person: Person) => void;
}

export function Discover({ onBack, onPersonSelect }: DiscoverProps) {
  const [likedPeople, setLikedPeople] = useState<Person[]>([]);

  const handleLike = (person: Person) => {
    setLikedPeople([...likedPeople, person]);
    toast.success(`Вы лайкнули ${person.name}! 💚`);
  };

  const handleDislike = (person: Person) => {
    // Just skip
  };

  const handleViewProfile = (person: Person) => {
    onPersonSelect(person);
  };

  // Add compatibility to people for discover
  const peopleWithCompatibility = mockPeople.map((person, index) => ({
    ...person,
    compatibility: 85 + index * 2,
    compatibilityReasons: [
      'Вы оба активны в вечернее время',
      'Схожий ритм жизни и предпочтения',
      'Общие интересы',
    ],
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold">Открыть</h1>
              <p className="text-sm text-gray-500">Познакомься с новыми людьми</p>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Cards */}
      <div className="max-w-2xl mx-auto p-4">
        <SwipeCards
          people={peopleWithCompatibility}
          onLike={handleLike}
          onDislike={handleDislike}
          onViewProfile={handleViewProfile}
        />
      </div>

      {/* Info Banner */}
      <div className="max-w-2xl mx-auto px-4 pb-4">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-1">
            💡 Совет
          </h3>
          <p className="text-sm text-blue-700">
            Свайпайте вправо, если человек интересен. При взаимном лайке вы сможете начать общение!
          </p>
        </div>
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20" />
    </div>
  );
}