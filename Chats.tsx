import { useState } from 'react';
import { mockChats, mockCurrentUser } from '../data/mockData';
import { Chat as ChatType, Message } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, Send, MapPin, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';

interface ChatsProps {
  onBack?: () => void;
}

export function Chats({ onBack }: ChatsProps) {
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChat) return;

    // Mock send message
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ru', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Сегодня';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    } else {
      return new Intl.DateTimeFormat('ru', {
        day: 'numeric',
        month: 'long',
      }).format(date);
    }
  };

  if (selectedChat) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-100 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setSelectedChat(null)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img
                src={selectedChat.person.photo}
                alt={selectedChat.person.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{selectedChat.person.name}</h2>
                <p className="text-sm text-gray-500">{selectedChat.plan.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Context */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
          <div className="max-w-2xl mx-auto p-3">
            <div className="flex items-start gap-3">
              <img
                src={selectedChat.plan.image}
                alt={selectedChat.plan.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{selectedChat.plan.title}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{selectedChat.plan.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{selectedChat.plan.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto p-4 space-y-4">
            {selectedChat.messages.map((message, index) => {
              const isOwn = message.senderId === 'me';
              const showDate =
                index === 0 ||
                formatDate(message.timestamp) !==
                  formatDate(selectedChat.messages[index - 1].timestamp);

              return (
                <div key={message.id}>
                  {showDate && (
                    <div className="text-center my-4">
                      <Badge variant="secondary" className="text-xs">
                        {formatDate(message.timestamp)}
                      </Badge>
                    </div>
                  )}
                  <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        isOwn
                          ? 'bg-blue-500 text-white rounded-br-sm'
                          : 'bg-white border border-gray-200 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          isOwn ? 'text-blue-100' : 'text-gray-400'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-100 p-4">
          <div className="max-w-2xl mx-auto flex items-center gap-2">
            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Написать сообщение..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
              <h1 className="text-2xl font-bold">Чаты</h1>
              <p className="text-sm text-gray-500">Обсуди детали встречи</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="max-w-2xl mx-auto p-4">
        <div className="space-y-2">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className="bg-white p-4 rounded-xl border border-gray-100 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={chat.person.photo}
                    alt={chat.person.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{chat.person.name}</h3>
                    {chat.lastMessage && (
                      <span className="text-xs text-gray-500">
                        {formatTime(chat.lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-purple-600 mb-1">{chat.plan.title}</p>
                  {chat.lastMessage && (
                    <p className="text-sm text-gray-500 truncate">
                      {chat.lastMessage.text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockChats.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Нет активных чатов</p>
            <p className="text-sm text-gray-400 mt-1">
              Начните общение с интересными людьми
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
