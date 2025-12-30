import { mockCurrentUser, badges } from '../data/mockData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Settings, CheckCircle2, MapPin, Edit } from 'lucide-react';
import { useState } from 'react';

export function UserProfile() {
  const [selectedBadges, setSelectedBadges] = useState(mockCurrentUser.badges);
  const [isEditing, setIsEditing] = useState(false);

  const toggleBadge = (badge: typeof badges[0]) => {
    setSelectedBadges((prev) => {
      const exists = prev.find((b) => b.id === badge.id);
      if (exists) {
        return prev.filter((b) => b.id !== badge.id);
      } else {
        return [...prev, badge];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Профиль</h1>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
          <div className="relative">
            <img
              src={mockCurrentUser.photo}
              alt={mockCurrentUser.name}
              className="w-full h-64 object-cover"
            />
            {mockCurrentUser.verified && (
              <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full p-2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-xl font-bold">
                  {mockCurrentUser.name}, {mockCurrentUser.age}
                </h2>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>Москва</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Редактировать
              </Button>
            </div>

            {mockCurrentUser.verified && (
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Профиль верифицирован через T-ID
                  </span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  Ваш профиль защищён от мошенников и фейковых аккаунтов
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Роадмап жизни</h3>
              <p className="text-sm text-gray-500">
                Бейджи на основе ваших данных T-Bank
              </p>
            </div>
            <Button
              variant={isEditing ? 'default' : 'outline'}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Готово' : 'Изменить'}
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Выберите бейджи, которые лучше всего описывают вас
              </p>
              <div className="flex flex-wrap gap-2">
                {badges
                  .filter((b) => b.category !== 'verified')
                  .map((badge) => {
                    const isSelected = selectedBadges.some((b) => b.id === badge.id);
                    return (
                      <Badge
                        key={badge.id}
                        variant={isSelected ? 'default' : 'outline'}
                        className="cursor-pointer text-sm"
                        onClick={() => toggleBadge(badge)}
                      >
                        {badge.icon} {badge.label}
                      </Badge>
                    );
                  })}
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">
                  💡 Мы автоматически подобрали эти бейджи на основе ваших транзакций и
                  активности. Вы можете добавить или убрать любые.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedBadges.map((badge) => (
                <Badge
                  key={badge.id}
                  variant={badge.category === 'verified' ? 'default' : 'secondary'}
                  className="text-sm"
                >
                  {badge.icon} {badge.label}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-xs text-gray-500 mt-1">Планов</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-xs text-gray-500 mt-1">Встреч</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
            <div className="text-2xl font-bold text-green-600">94%</div>
            <div className="text-xs text-gray-500 mt-1">Рейтинг</div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
          <h3 className="font-semibold text-purple-900 mb-2">
            🎯 Как работает совместимость
          </h3>
          <p className="text-sm text-purple-700">
            Мы анализируем ваш ритм жизни, привычки и предпочтения на основе
            транзакций и активности. Это помогает находить людей, с которыми у вас
            высокий шанс хорошей встречи.
          </p>
        </div>

        {/* Privacy */}
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <h3 className="font-semibold mb-2">🔒 Конфиденциальность</h3>
          <p className="text-sm text-gray-600 mb-3">
            Мы не показываем ваши доходы, суммы трат или кредитные рейтинги. Только
            агрегированные данные о стиле жизни.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Настройки приватности
          </Button>
        </div>
      </div>
    </div>
  );
}
