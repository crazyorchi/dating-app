import { Person } from '../types';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface PersonCardProps {
  person: Person;
  onClick?: () => void;
  showCompatibility?: boolean;
}

export function PersonCard({ person, onClick, showCompatibility }: PersonCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl overflow-hidden border border-gray-100 ${
        onClick ? 'cursor-pointer hover:shadow-md transition-all' : ''
      }`}
    >
      <div className="relative">
        <img
          src={person.photo}
          alt={person.name}
          className="w-full h-64 object-cover"
        />
        {person.verified && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full p-1.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-semibold">
              {person.name}, {person.age}
            </h3>
            {person.distance && (
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <MapPin className="w-3 h-3" />
                <span>{person.distance}</span>
              </div>
            )}
          </div>
          {person.verified && (
            <Badge variant="outline" className="text-xs border-blue-500 text-blue-600">
              T-ID ✓
            </Badge>
          )}
        </div>

        {showCompatibility && person.compatibility && (
          <div className="mb-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Совместимость</span>
              <span className="text-lg font-bold text-purple-600">
                {person.compatibility}%
              </span>
            </div>
            <Progress value={person.compatibility} className="h-2" />
            {person.compatibilityReasons && person.compatibilityReasons.length > 0 && (
              <div className="mt-2 space-y-1">
                {person.compatibilityReasons.map((reason, index) => (
                  <p key={index} className="text-xs text-gray-600">
                    • {reason}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {person.badges.slice(0, 4).map((badge) => (
            <Badge
              key={badge.id}
              variant={badge.category === 'verified' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {badge.icon} {badge.label}
            </Badge>
          ))}
          {person.badges.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{person.badges.length - 4}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
