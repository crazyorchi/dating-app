import { Home, MessageCircle, User, Compass } from 'lucide-react';
import { mockChats } from '../data/mockData';

interface NavigationProps {
  activeTab: 'plans' | 'discover' | 'chats' | 'profile';
  onTabChange: (tab: 'plans' | 'discover' | 'chats' | 'profile') => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const unreadCount = mockChats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  const tabs = [
    { id: 'plans' as const, icon: Home, label: 'Планы' },
    { id: 'discover' as const, icon: Compass, label: 'Открыть' },
    { id: 'chats' as const, icon: MessageCircle, label: 'Чаты', badge: unreadCount },
    { id: 'profile' as const, icon: User, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="relative">
                  <Icon className="w-6 h-6" />
                  {tab.badge && tab.badge > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {tab.badge}
                    </div>
                  )}
                </div>
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
