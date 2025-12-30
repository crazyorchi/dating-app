import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ArrowLeft, MapPin, Calendar, Clock, DollarSign, Users } from 'lucide-react';
import { Badge } from './ui/badge';

interface CreatePlanProps {
  onBack: () => void;
  onCreate: (plan: any) => void;
}

const planCategories = [
  { id: 'casual', label: 'Casual', icon: '☕', examples: 'Кофе, прогулка, беседа' },
  { id: 'event', label: 'Событие', icon: '🎫', examples: 'Концерт, выставка, театр' },
  { id: 'activity', label: 'Активность', icon: '🎯', examples: 'Спорт, хобби, игры' },
];

const activityTypes = [
  { id: 'pair', label: 'Вдвоём', icon: '👥', description: 'Ищу одного человека' },
  { id: 'group', label: 'Компанией', icon: '👨‍👩‍👧‍👦', description: 'Ищу небольшую группу' },
];

export function CreatePlan({ onBack, onCreate }: CreatePlanProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: 'casual' as 'casual' | 'event' | 'activity',
    activityType: 'pair' as 'pair' | 'group',
    description: '',
    location: '',
    date: '',
    time: '',
    price: '',
    maxParticipants: 2,
  });

  const handleSubmit = () => {
    // Create plan
    onCreate({
      ...formData,
      isCustom: true,
      isPairActivity: formData.activityType === 'pair',
    });
  };

  const isStep1Valid = formData.title && formData.category && formData.activityType;
  const isStep2Valid = formData.location && formData.date;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Создать план</h1>
              <p className="text-sm text-gray-500">Шаг {step} из 2</p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex gap-2">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`} />
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {step === 1 && (
          <>
            {/* Activity Type */}
            <div className="space-y-3">
              <h2 className="font-semibold">Как планируешь встретиться?</h2>
              <div className="grid gap-3">
                {activityTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setFormData({ ...formData, activityType: type.id as 'pair' | 'group', maxParticipants: type.id === 'pair' ? 2 : 6 })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.activityType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{type.icon}</span>
                      <div>
                        <h3 className="font-semibold">{type.label}</h3>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="font-semibold">Название плана</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Например: Кофе в центре"
                className="text-lg"
              />
            </div>

            {/* Category */}
            <div className="space-y-3">
              <label className="font-semibold">Категория</label>
              <div className="grid gap-3">
                {planCategories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setFormData({ ...formData, category: cat.id as any })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.category === cat.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <h3 className="font-semibold">{cat.label}</h3>
                        <p className="text-sm text-gray-500">{cat.examples}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="font-semibold">Описание (опционально)</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Расскажи подробнее о своём плане..."
                rows={3}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {/* Location */}
            <div className="space-y-2">
              <label className="font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Место встречи
              </label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Например: Кофейня на Никольской"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Дата
                </label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Время
                </label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="font-semibold flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Примерная стоимость (опционально)
              </label>
              <Input
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Например: ~500 ₽"
              />
            </div>

            {/* Max Participants (if group) */}
            {formData.activityType === 'group' && (
              <div className="space-y-2">
                <label className="font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Максимум участников
                </label>
                <Input
                  type="number"
                  min="3"
                  max="20"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
                />
              </div>
            )}

            {/* Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Ваш план</h3>
              <div className="space-y-2 text-sm">
                <p><strong>{formData.title}</strong></p>
                {formData.description && <p className="text-gray-700">{formData.description}</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary">
                    {formData.activityType === 'pair' ? '👥 Вдвоём' : '👨‍👩‍👧‍👦 Компанией'}
                  </Badge>
                  <Badge variant="secondary">
                    {planCategories.find(c => c.id === formData.category)?.icon} {planCategories.find(c => c.id === formData.category)?.label}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-green-50 p-4 rounded-2xl border border-green-200">
              <h3 className="font-semibold text-green-900 mb-2">
                💡 Что дальше?
              </h3>
              <p className="text-sm text-green-700">
                Мы покажем ваш план людям с высокой совместимостью. Когда кто-то заинтересуется, вы сможете начать общение!
              </p>
            </div>
          </>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          {step === 2 && (
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              Назад
            </Button>
          )}
          <Button
            onClick={step === 1 ? () => setStep(2) : handleSubmit}
            disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
            className="flex-1"
          >
            {step === 1 ? 'Далее' : 'Создать план'}
          </Button>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-20" />
    </div>
  );
}
