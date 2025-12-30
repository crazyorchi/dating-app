import { useState } from 'react';
import { PlansFeed } from './components/PlansFeed';
import { PlanDetails } from './components/PlanDetails';
import { Chats } from './components/Chats';
import { UserProfile } from './components/UserProfile';
import { Discover } from './components/Discover';
import { SwipeCards } from './components/SwipeCards';
import { PersonDetails } from './components/PersonDetails';
import { CreatePlan } from './components/CreatePlan';
import { Navigation } from './components/Navigation';
import { Plan, Person } from './types';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

type Screen = 
  | 'plans' 
  | 'discover' 
  | 'chats' 
  | 'profile' 
  | 'planDetails' 
  | 'personDetails'
  | 'createPlan';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('plans');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setCurrentScreen('planDetails');
  };

  const handleBackToPlansFeed = () => {
    setCurrentScreen('plans');
    setSelectedPlan(null);
  };

  const handlePersonSelect = (person: Person) => {
    setSelectedPerson(person);
    setCurrentScreen('personDetails');
  };

  const handleBackFromPersonDetails = () => {
    // If we came from discover, go back to discover
    setCurrentScreen('discover');
    setSelectedPerson(null);
  };

  const handleTabChange = (tab: 'plans' | 'discover' | 'chats' | 'profile') => {
    setCurrentScreen(tab);
  };

  const handleCreatePlan = () => {
    setCurrentScreen('createPlan');
  };

  const handlePlanCreated = (plan: any) => {
    toast.success('План создан! 🎉');
    setCurrentScreen('plans');
  };

  const handleDiscoverPeople = () => {
    setCurrentScreen('discover');
  };

  const handleLikePerson = (person: Person) => {
    toast.success(`Вы лайкнули ${person.name}! 💚`);
    handleBackFromPersonDetails();
  };

  const handleDislikePerson = (person: Person) => {
    toast('Пропущено');
    handleBackFromPersonDetails();
  };

  const handleMessagePerson = (person: Person) => {
    toast.success('Чат открыт! 💬');
    setCurrentScreen('chats');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'plans':
        return (
          <PlansFeed 
            onPlanSelect={handlePlanSelect}
            onCreatePlan={handleCreatePlan}
            onDiscoverPeople={handleDiscoverPeople}
          />
        );
      case 'discover':
        return (
          <Discover 
            onPersonSelect={handlePersonSelect}
          />
        );
      case 'chats':
        return <Chats />;
      case 'profile':
        return <UserProfile />;
      case 'planDetails':
        return selectedPlan ? (
          <PlanDetails
            plan={selectedPlan}
            onBack={handleBackToPlansFeed}
            onPersonSelect={handlePersonSelect}
          />
        ) : null;
      case 'personDetails':
        return selectedPerson ? (
          <PersonDetails
            person={selectedPerson}
            onBack={handleBackFromPersonDetails}
            onLike={handleLikePerson}
            onDislike={handleDislikePerson}
            onMessage={handleMessagePerson}
          />
        ) : null;
      case 'createPlan':
        return (
          <CreatePlan
            onBack={handleBackToPlansFeed}
            onCreate={handlePlanCreated}
          />
        );
      default:
        return (
          <PlansFeed 
            onPlanSelect={handlePlanSelect}
            onCreatePlan={handleCreatePlan}
            onDiscoverPeople={handleDiscoverPeople}
          />
        );
    }
  };

  const showNavigation = !['planDetails', 'personDetails', 'createPlan'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
      
      {/* Show navigation only on main screens */}
      {showNavigation && (
        <Navigation
          activeTab={currentScreen as 'plans' | 'discover' | 'chats' | 'profile'}
          onTabChange={handleTabChange}
        />
      )}
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}

export default App;
