import { useState } from 'react';
import { Person } from '../types';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { X, Heart, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface SwipeCardProps {
  person: Person;
  onLike: (person: Person) => void;
  onDislike: (person: Person) => void;
  onViewProfile: (person: Person) => void;
}

export function SwipeCard({ person, onLike, onDislike, onViewProfile }: SwipeCardProps) {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      setExitX(info.offset.x > 0 ? 200 : -200);
      if (info.offset.x > 0) {
        setTimeout(() => onLike(person), 200);
      } else {
        setTimeout(() => onDislike(person), 200);
      }
    }
  };

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity,
        position: 'absolute',
        width: '100%',
        cursor: 'grab',
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={exitX !== 0 ? { x: exitX } : {}}
      transition={{ duration: 0.3 }}
      whileTap={{ cursor: 'grabbing' }}
      className="touch-none"
    >
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl">
        {/* Main Image */}
        <div className="relative h-[500px]">
          <img
            src={person.photo}
            alt={person.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Swipe Indicators */}
          <motion.div
            style={{
              opacity: useTransform(x, [0, 100], [0, 1]),
            }}
            className="absolute top-8 right-8 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-xl rotate-12 border-4 border-white"
          >
            LIKE
          </motion.div>
          
          <motion.div
            style={{
              opacity: useTransform(x, [-100, 0], [1, 0]),
            }}
            className="absolute top-8 left-8 bg-red-500 text-white px-6 py-3 rounded-full font-bold text-xl -rotate-12 border-4 border-white"
          >
            NOPE
          </motion.div>

          {/* Person Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end justify-between mb-3">
              <div>
                <h2 className="text-white text-3xl font-bold mb-1">
                  {person.name}, {person.age}
                </h2>
                {person.bio && (
                  <p className="text-white/90 text-sm">{person.bio}</p>
                )}
                {person.distance && (
                  <p className="text-white/70 text-sm mt-1">📍 {person.distance}</p>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewProfile(person);
                }}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              >
                <Info className="w-5 h-5" />
              </Button>
            </div>

            {/* Compatibility */}
            {person.compatibility && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">Совместимость</span>
                  <span className="text-white font-bold">{person.compatibility}%</span>
                </div>
                <Progress value={person.compatibility} className="h-2 bg-white/20" />
              </div>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {person.badges.slice(0, 5).map((badge) => (
                <Badge
                  key={badge.id}
                  className="bg-white/20 backdrop-blur-sm text-white border-0"
                >
                  {badge.icon} {badge.label}
                </Badge>
              ))}
              {person.badges.length > 5 && (
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                  +{person.badges.length - 5}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface SwipeCardsProps {
  people: Person[];
  onLike: (person: Person) => void;
  onDislike: (person: Person) => void;
  onViewProfile: (person: Person) => void;
}

export function SwipeCards({ people, onLike, onDislike, onViewProfile }: SwipeCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = (person: Person) => {
    onLike(person);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDislike = (person: Person) => {
    onDislike(person);
    setCurrentIndex((prev) => prev + 1);
  };

  const currentPerson = people[currentIndex];
  const nextPerson = people[currentIndex + 1];

  if (currentIndex >= people.length) {
    return (
      <div className="flex items-center justify-center h-[500px] text-center px-4">
        <div>
          <p className="text-xl font-semibold mb-2">Пока всё! 🎉</p>
          <p className="text-gray-500">Новые люди скоро появятся</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cards Stack */}
      <div className="relative h-[500px]">
        {/* Next Card (behind) */}
        {nextPerson && (
          <div className="absolute w-full scale-95 opacity-50">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
              <img
                src={nextPerson.photo}
                alt={nextPerson.name}
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        )}

        {/* Current Card */}
        {currentPerson && (
          <SwipeCard
            person={currentPerson}
            onLike={handleLike}
            onDislike={handleDislike}
            onViewProfile={onViewProfile}
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleDislike(currentPerson)}
          className="h-16 w-16 rounded-full border-2 border-red-500 hover:bg-red-50 hover:border-red-600"
        >
          <X className="w-8 h-8 text-red-500" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onViewProfile(currentPerson)}
          className="h-14 w-14 rounded-full border-2 border-blue-500 hover:bg-blue-50 hover:border-blue-600"
        >
          <Info className="w-6 h-6 text-blue-500" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => handleLike(currentPerson)}
          className="h-16 w-16 rounded-full border-2 border-green-500 hover:bg-green-50 hover:border-green-600"
        >
          <Heart className="w-8 h-8 text-green-500 fill-green-500" />
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="text-center text-sm text-gray-500">
        {currentIndex + 1} / {people.length}
      </div>
    </div>
  );
}
