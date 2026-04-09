import Navpanel from "@/widgets/Navpanel/Navpanel";
import { Goals } from "./Goals/Goals";
import { PhotoSection } from "./PhotoSection/PhotoSection";
import { ProjectName } from "./ProjectName/ProjectName";
import { useTranslation } from "react-i18next";
import { useDetailProjectStore } from "@/app/store/projectDetail/projectDetail";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function ProjectNamePages() {
  const { t } = useTranslation();

  return (
    <div>
      <Navpanel
        text={t("projects.home")}
        link="/"
        text2={t("projects.projects")}
        link2="/project"
        text3="Проект “Название” "
      />
      <ProjectName />
      <Goals />
      <PhotoSection />
    </div>
  );
}
