import { Plan } from '../types';
import { PersonCard } from './PersonCard';
import { Button } from './ui/button';
import { ArrowLeft, MapPin, Calendar, Clock, Users, TrendingUp, Share2, DollarSign, UserCheck } from 'lucide-react';
import { Badge } from './ui/badge';

interface PlanDetailsProps {
  plan: Plan;
  onBack: () => void;
  onPersonSelect: (personId: string) => void;
}

export function PlanDetails({ plan, onBack, onPersonSelect }: PlanDetailsProps) {
  const handleJoinPlan = () => {
    // Handle join plan action
    console.log('Joining plan:', plan.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with image */}
      <div className="relative">
        <img
          src={plan.image}
          alt={plan.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <Share2 className="w-5 h-5" />
        </Button>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex gap-2 mb-2">
            <Badge className="bg-white/90 text-black backdrop-blur-sm border-0">
              {plan.category === 'event' && '🎫 Событие'}
              {plan.category === 'casual' && '☕ Casual'}
              {plan.category === 'activity' && '🎯 Активность'}
            </Badge>
            {plan.isPairActivity && (
              <Badge className="bg-purple-500/90 text-white backdrop-blur-sm border-0">
                <UserCheck className="w-4 h-4 mr-1" />
                Вдвоём
              </Badge>
            )}
          </div>
          <h1 className="text-white text-2xl font-bold">{plan.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Дата</span>
            </div>
            <p className="font-medium">{plan.date}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Время</span>
            </div>
            <p className="font-medium">{plan.time}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">Участники</span>
            </div>
            <p className="font-medium">
              {plan.participants}
              {plan.maxParticipants && ` / ${plan.maxParticipants}`}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Цена</span>
            </div>
            <p className="font-medium">{plan.price || 'Бесплатно'}</p>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold">Место</h3>
          </div>
          <p className="text-gray-600">{plan.location}</p>
        </div>

        {/* Cashback */}
        {plan.cashback && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Выгода</h3>
            </div>
            <p className="text-green-700">{plan.cashback} при оплате через T-Bank</p>
          </div>
        )}

        {/* Description */}
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <h3 className="font-semibold mb-2">Описание</h3>
          <p className="text-gray-600">{plan.description}</p>
          
          <div className="flex flex-wrap gap-1.5 mt-3">
            {plan.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Interested People */}
        {plan.interestedPeople.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {plan.isPairActivity 
                  ? `Ищут пару (${plan.interestedPeople.length})`
                  : `Подходящие люди (${plan.interestedPeople.length})`
                }
              </h3>
              <span className="text-sm text-gray-500">По совместимости</span>
            </div>

            <div className="grid gap-3">
              {plan.interestedPeople.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onClick={() => onPersonSelect(person.id)}
                  showCompatibility
                />
              ))}
            </div>
          </div>
        )}

        {/* Split Payment Info */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">💳 Разделить расходы</h3>
          <p className="text-sm text-blue-700">
            Вы можете легко разделить счёт с помощью встроенного сплитования T-Bank
          </p>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={handleJoinPlan}
            className="w-full h-12"
            size="lg"
          >
            {plan.isPairActivity ? 'Найти пару' : 'Присоединиться к плану'}
          </Button>
        </div>
      </div>

      {/* Bottom spacing for fixed button */}
      <div className="h-20" />
    </div>
  );
}