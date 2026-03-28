import Navpanel from "@/widgets/Navpanel/Navpanel";
import { Goals } from "./Goals/Goals";
import { PhotoSection } from "./PhotoSection/PhotoSection";
import { ProjectName } from "./ProjectName/ProjectName";
import { useTranslation } from "react-i18next";

export function ProjectNamePages() {
  const {t, i18n} = useTranslation()
  return (
    <div>
      <Navpanel text={t('projects.home')} link="/" text2={t('projects.projects')} link2="/project" text3="Проект “Название” "/>
     <ProjectName/>
     <Goals/>
     <PhotoSection/>
    </div>
  );
}
