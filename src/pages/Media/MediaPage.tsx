import Navpanel from "@/widgets/Navpanel/Navpanel";
import { PhotoGallery } from "./ui/PhotoGallery/PhotoGallery";
import { VideoGallery } from "./ui/VideoGallery/VideoGallery";
import { useTranslation } from "react-i18next";
export function MediaPage() {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Navpanel
        text={t("media.home") as string}
        link="/"
        text2={t("media.media") as string}
      />
      <PhotoGallery />
      <VideoGallery />
    </div>
  );
}
