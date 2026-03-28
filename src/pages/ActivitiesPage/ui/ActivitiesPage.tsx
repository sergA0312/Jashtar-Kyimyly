import ActivitiesSection from "@/widgets/ActivitiesSection/ui/ActivitiesSection"
import Navpanel from "@/widgets/Navpanel/Navpanel"
import { useTranslation } from "react-i18next"

function ActivitiesPage() {
  const {t, i18n} = useTranslation()
  return (
    <div>
      <Navpanel text={t('header.home')} text2={t('landing.direction')} link="/"/>
      <ActivitiesSection />
    </div>
  )
}

export default ActivitiesPage
