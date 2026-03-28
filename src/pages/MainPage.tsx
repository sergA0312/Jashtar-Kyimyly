import { Banners } from "@/widgets/Banners";
import { Movement } from "@/widgets/Movment";
import BrandsPages from "./BrandsPages/BrandsPages";
import { EventsPages } from "./EventsPages/EventsPages";
import { NewsPages } from "./NewsPages/NewsPages";

const MainPage = () => {
  return (
    <div>
      <Banners />
      <Movement />
      <EventsPages />
      <NewsPages />
      <BrandsPages />
    </div>
  );
};

export default MainPage;
