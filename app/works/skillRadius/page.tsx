import SkillRadius from '../../components/works-pages/skillRadius';
import MoreWorks from '../../components/works-pages/MoreWorks';

export default function SkillRadiusPage() {
  return (
    <div className="bg-white min-h-screen">
      <SkillRadius />
      <MoreWorks current="/works/skillRadius" />
    </div>
  );
}
