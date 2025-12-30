import { useState } from 'react';
import { mockPlans, mockPeople } from '../data/mockData';
import { PlanCard } from './PlanCard';
import { Plan } from '../types';
import { Search, SlidersHorizontal, Plus, Users } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { UpcomingMeetings } from './UpcomingMeetings';

interface PlansFeedProps {
  onPlanSelect: (plan: Plan) => void;
  onCreatePlan: () => void;
  onDiscoverPeople: () => void;
}

const categories = [
  { id: 'all', label: 'Все', icon: '✨' },
  { id: 'pair', label: 'Вдвоём', icon: '👥' },
  { id: 'event', label: 'События', icon: '🎫' },
  { id: 'casual', label: 'Casual', icon: '☕' },
  { id: 'activity', label: 'Активности', icon: '🎯' },
];

export function PlansFeed({ onPlanSelect, onCreatePlan, onDiscoverPeople }: PlansFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlans = mockPlans.filter((plan) => {
    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'pair' && plan.isPairActivity) ||
      (selectedCategory !== 'pair' && plan.category === selectedCategory);
    const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Планы</h1>
              <p className="text-sm text-gray-500">Найди пару для встречи</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onDiscoverPeople}
              >
                <Users className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Поиск планов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon} {category.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Upcoming Meetings */}
        <UpcomingMeetings />

        {/* Create Plan CTA */}
        <div
          onClick={onCreatePlan}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-3xl cursor-pointer hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Plus className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">Создать свой план</h3>
              <p className="text-sm text-white/90">
                Предложи встречу и найди подходящего человека
              </p>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div>
          <h3 className="font-semibold mb-3">Все планы</h3>
          <div className="grid gap-4">
            {filteredPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onClick={() => onPlanSelect(plan)} />
            ))}
          </div>

          {filteredPlans.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Планы не найдены</p>
              <p className="text-sm text-gray-400 mt-1">Попробуйте изменить фильтры</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-20" />
    </div>
  );
}