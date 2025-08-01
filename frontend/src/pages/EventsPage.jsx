import Header from '../components/Layout/Header';
import EventCard from '../components/Events/EventCard';
import { productData } from '../static/data';

function EventsPage() {
  return (
    <div>
      <Header activeHeading={4} />
      {productData.slice(0, 2).map((item, index) => (
        <EventCard key={index} active={true} data={item} />
      ))}
    </div>
  );
}

export default EventsPage;
