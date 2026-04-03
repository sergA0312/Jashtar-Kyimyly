import { Banners } from "@/widgets/Banners";
import BrandsPages from "./BrandsPages/BrandsPages";
import { EventsPages } from "./EventsPages/EventsPages";
import { NewsPages } from "./NewsPages/NewsPages";
import { MovementPages } from "./Movement/ui/MovementPages";

const MainPage = () => {
  return (
    <div>
      <Banners />
      <MovementPages />
      <EventsPages />
      <NewsPages />
      <BrandsPages />
    </div>
  );
};

export default MainPage;
