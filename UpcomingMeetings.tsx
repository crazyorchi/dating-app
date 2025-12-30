import { mockConfirmedMeetings } from '../data/mockData';
import { ConfirmedMeeting } from '../types';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface UpcomingMeetingsProps {
  onMeetingClick?: (meeting: ConfirmedMeeting) => void;
}

export function UpcomingMeetings({ onMeetingClick }: UpcomingMeetingsProps) {
  const todayMeetings = mockConfirmedMeetings.filter((m) => m.isToday);
  const upcomingMeetings = mockConfirmedMeetings.filter((m) => !m.isToday);

  if (mockConfirmedMeetings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Today's Meetings */}
      {todayMeetings.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <h2 className="font-bold text-lg">Сейчас рядом</h2>
          </div>
          <p className="text-sm text-gray-500">
            4 совпадений за последние 24 часа
          </p>

          {todayMeetings.map((meeting) => (
            <div
              key={meeting.id}
              onClick={() => onMeetingClick?.(meeting)}
              className="relative bg-gradient-to-br from-pink-500 to-orange-500 rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl transition-all"
            >
              {/* Background Image */}
              <div className="relative h-48">
                <img
                  src={meeting.person.photo}
                  alt={meeting.person.name}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Today Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-pink-500/90 text-white backdrop-blur-sm border-0 text-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    вчера в {meeting.time}
                  </Badge>
                </div>

                {/* Person Info Overlay */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={meeting.person.photo}
                      alt={meeting.person.name}
                      className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">
                        {meeting.person.name}, {meeting.person.age}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {meeting.person.bio}
                      </p>
                    </div>
                  </div>

                  {/* Meeting Details */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-sm">☕</span>
                      <span className="text-white font-medium">
                        {meeting.plan.title}
                      </span>
                    </div>
                    <p className="text-white/90 text-sm">{meeting.plan.location}</p>
                  </div>
                </div>
              </div>

              {/* Compatibility Bar */}
              {meeting.person.compatibility && (
                <div className="absolute top-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-sm font-bold text-pink-600">
                      {meeting.person.compatibility}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Meetings */}
      {upcomingMeetings.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">Скоро</h3>

          {upcomingMeetings.map((meeting) => (
            <div
              key={meeting.id}
              onClick={() => onMeetingClick?.(meeting)}
              className="bg-white p-4 rounded-2xl border border-gray-100 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <img
                  src={meeting.person.photo}
                  alt={meeting.person.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">
                    {meeting.person.name}, {meeting.person.age}
                  </h4>
                  <p className="text-sm text-purple-600 mb-2">
                    {meeting.plan.title}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{meeting.plan.location}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Подтверждено
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
