import Header from '../components/Layout/Header';
import EventCard from '../components/Events/EventCard';
import { productData } from '../static/data';

function EventsPage() {
  return (
    <div>
      <Header activeHeading={4} />
      <EventCard active={true}/>
      <EventCard active={true}/>
    </div>
  );
}

export default EventsPage;
