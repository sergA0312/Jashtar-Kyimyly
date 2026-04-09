import ActivitiesPage from "@/pages/ActivitiesPage/ui/ActivitiesPage";
import { Allbom } from "@/pages/Allbom/Allbom";
import { BranchNamePages } from "@/pages/BranchName/ui/BranchNamePages";
import DetailView from "@/pages/BrandsMaterials/ui/DetailView/DetailView";
import Main from "@/pages/BrandsMaterials/ui/Main/Main";
import EventsArchivePage from "@/pages/EventsArchivePage/EventsArchivePage";
import Events from "@/pages/EventsPage/Events";
import MainPage from "@/pages/MainPage";
import { MediaPage } from "@/pages/Media/MediaPage";
import { MovementPages } from "@/pages/Movement/ui/MovementPages";
import NameOfTheEvent from "@/pages/NameOfTheEvent/NameOfTheEvent";
import News from "@/pages/News/News";
import NewsPage from "@/pages/NewsPage/NewsPage";
import { VerifyToken } from "@/pages/VerifyToken/VerifyToken";
import { ForgotPassword } from "@/pages/ForgotPassword/ForgotPassword";
import { VerifyCode } from "@/pages/VerifyCode/VerifyCode";
import { NewPassword } from "@/pages/NewPassword/NewPaasord";
import NotFound from "@/pages/NotFound/NotFound";
import { Profile } from "@/pages/PersonalInformation/Profile";
import { PhotoGallry } from "@/pages/Photo/PhotoGallry";
import { Project } from "@/pages/Project/ui/Project";
import { ProjectNamePages } from "@/pages/ProjectName/ui/ProjectNamePages";
import { Register } from "@/pages/Register/Register";
import { SignIn } from "@/pages/SigneIn/SigneIn";
import { Video } from "@/pages/Video/Video";
import { Route, Routes } from "react-router-dom";

export default function Routing() {
  const PUBLIC_PAGES = [
    { link: "/", page: <MainPage />, id: 1 },
    { link: "/activitiesPage", page: <ActivitiesPage />, id: 2 },
    { link: "/movementpages", page: <MovementPages />, id: 3 },
    { link: "/branchnamepages", page: <BranchNamePages />, id: 4 },
    { link: "/project", page: <Project />, id: 5 },
    { link: "/project/:id", page: <ProjectNamePages />, id: 6 },
    { link: "/media", page: <MediaPage />, id: 7 },
    { link: "/photoGallery", page: <PhotoGallry />, id: 8 },
    { link: "/videoGallery", page: <Video />, id: 9 },
    { link: "/media/photo-gallery/:albumId", page: <Allbom />, id: 10 },
    { link: "/register", page: <Register />, id: 11 },
    { link: "/login", page: <SignIn />, id: 12 },
    { link: "/profile", page: <Profile />, id: 13 },
    { link: "/main", page: <Main />, id: 14 },
    { link: "/detailview/:id", page: <DetailView />, id: 15 },
    { link: "/detailview", page: <DetailView />, id: 16 },
    { link: "/events", page: <Events />, id: 17 },
    { link: "/events/:id", page: <NameOfTheEvent />, id: 18 },
    { link: "/eventsArchivePage", page: <EventsArchivePage />, id: 19 },
    { link: "/news", page: <News />, id: 20 }, // ← ИСПРАВЛЕНО: убран item={undefined}
    { link: "/news/:id", page: <NewsPage />, id: 21 }, // ← Детальная страница новости
    { link: "/verify-email", page: <VerifyToken />, id: 22 },
    { link: "/forgot-password", page: <ForgotPassword />, id: 23 },
    { link: "/verify-code", page: <VerifyCode />, id: 24 },
    { link: "/new-password/:code", page: <NewPassword />, id: 25 },
    { link: "/nameoftheevent", page: <NameOfTheEvent />, id: 26 },
    { link: "*", page: <NotFound />, id: 27 },
  ];

  return (
    <Routes>
      {PUBLIC_PAGES.map((page) => (
        <Route
          path={page.link}
          element={<div>{page.page}</div>}
          key={page.id}
        />
      ))}
    </Routes>
  );
}
