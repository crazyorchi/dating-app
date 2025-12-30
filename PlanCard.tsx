import { Plan } from '../types';
import { MapPin, Users, TrendingUp, UserCheck } from 'lucide-react';
import { Badge } from './ui/badge';

interface PlanCardProps {
  plan: Plan;
  onClick: () => void;
}

export function PlanCard({ plan, onClick }: PlanCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all border border-gray-100"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={plan.image}
          alt={plan.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-white/90 text-black backdrop-blur-sm border-0">
            {plan.category === 'event' && '🎫 Событие'}
            {plan.category === 'casual' && '☕ Casual'}
            {plan.category === 'activity' && '🎯 Активность'}
          </Badge>
          {plan.isPairActivity && (
            <Badge className="bg-purple-500/90 text-white backdrop-blur-sm border-0">
              <UserCheck className="w-3 h-3 mr-1" />
              Вдвоём
            </Badge>
          )}
        </div>
        {plan.cashback && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-green-500/90 text-white backdrop-blur-sm border-0">
              <TrendingUp className="w-3 h-3 mr-1" />
              {plan.cashback}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-2">{plan.title}</h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{plan.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{plan.participants}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {plan.date && (
              <Badge variant="outline" className="text-xs">
                {plan.date}
              </Badge>
            )}
            {plan.time && (
              <Badge variant="outline" className="text-xs">
                {plan.time}
              </Badge>
            )}
          </div>
          {plan.price && (
            <span className="text-sm font-medium">{plan.price}</span>
          )}
        </div>

        {plan.interestedPeople.length > 0 && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <div className="flex -space-x-2">
              {plan.interestedPeople.slice(0, 3).map((person) => (
                <img
                  key={person.id}
                  src={person.photo}
                  alt={person.name}
                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {plan.isPairActivity 
                ? `${plan.interestedPeople.length} ${plan.interestedPeople.length === 1 ? 'человек ищет' : 'людей ищут'} пару`
                : `Интересно ${plan.interestedPeople.length} ${plan.interestedPeople.length === 1 ? 'человеку' : 'людям'}`
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
}