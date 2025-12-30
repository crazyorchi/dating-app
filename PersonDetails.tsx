import { useState } from 'react';
import { Person } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, MapPin, CheckCircle2, Heart, X, MessageCircle } from 'lucide-react';

interface PersonDetailsProps {
  person: Person;
  onBack: () => void;
  onLike?: (person: Person) => void;
  onDislike?: (person: Person) => void;
  onMessage?: (person: Person) => void;
}

export function PersonDetails({ person, onBack, onLike, onDislike, onMessage }: PersonDetailsProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const photos = person.photos || [person.photo];

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Photo Gallery */}
      <div className="relative">
        <img
          src={photos[currentPhotoIndex]}
          alt={person.name}
          className="w-full h-[500px] object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Photo Navigation */}
        {photos.length > 1 && (
          <>
            {/* Touch areas for navigation */}
            <div
              onClick={handlePrevPhoto}
              className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer"
            />
            <div
              onClick={handleNextPhoto}
              className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer"
            />

            {/* Photo Indicators */}
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-2 px-16">
              {photos.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full ${
                    index === currentPhotoIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Basic Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-white text-3xl font-bold mb-1">
                {person.name}, {person.age}
              </h1>
              {person.distance && (
                <div className="flex items-center gap-1 text-white/90">
                  <MapPin className="w-4 h-4" />
                  <span>{person.distance}</span>
                </div>
              )}
            </div>
            {person.verified && (
              <div className="bg-blue-500 text-white rounded-full p-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Compatibility */}
        {person.compatibility && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-purple-900">Совместимость</h3>
              <span className="text-2xl font-bold text-purple-600">
                {person.compatibility}%
              </span>
            </div>
            <Progress value={person.compatibility} className="h-2 mb-3" />
            {person.compatibilityReasons && person.compatibilityReasons.length > 0 && (
              <div className="space-y-2">
                {person.compatibilityReasons.map((reason, index) => (
                  <p key={index} className="text-sm text-purple-700">
                    • {reason}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bio */}
        {person.bio && (
          <div className="bg-white p-4 rounded-2xl border border-gray-100">
            <p className="text-gray-700">{person.bio}</p>
          </div>
        )}

        {/* About */}
        {person.about && (
          <div className="bg-white p-4 rounded-2xl border border-gray-100">
            <h3 className="font-semibold mb-2">О себе</h3>
            <p className="text-gray-600">{person.about}</p>
          </div>
        )}

        {/* Badges */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100">
          <h3 className="font-semibold mb-3">Роадмап жизни</h3>
          <div className="flex flex-wrap gap-2">
            {person.badges.map((badge) => (
              <Badge
                key={badge.id}
                variant={badge.category === 'verified' ? 'default' : 'secondary'}
                className="text-sm"
              >
                {badge.icon} {badge.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Verification */}
        {person.verified && (
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">
                Профиль верифицирован T-ID
              </h3>
            </div>
            <p className="text-sm text-blue-700">
              Личность подтверждена через банковскую систему T-Bank
            </p>
          </div>
        )}
      </div>

      {/* Fixed Bottom Actions */}
      {(onLike || onDislike || onMessage) && (
        <>
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
            <div className="max-w-2xl mx-auto flex items-center justify-center gap-4">
              {onDislike && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDislike(person)}
                  className="h-14 w-14 rounded-full border-2 border-red-500 hover:bg-red-50"
                >
                  <X className="w-6 h-6 text-red-500" />
                </Button>
              )}
              
              {onMessage && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onMessage(person)}
                  className="h-14 w-14 rounded-full border-2 border-blue-500 hover:bg-blue-50"
                >
                  <MessageCircle className="w-6 h-6 text-blue-500" />
                </Button>
              )}
              
              {onLike && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onLike(person)}
                  className="h-14 w-14 rounded-full border-2 border-green-500 hover:bg-green-50"
                >
                  <Heart className="w-6 h-6 text-green-500 fill-green-500" />
                </Button>
              )}
            </div>
          </div>
          <div className="h-20" />
        </>
      )}
    </div>
  );
}
