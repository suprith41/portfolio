import SmartNation from '../../components/works-pages/smartNation';
import MoreWorks from '../../components/works-pages/MoreWorks';

export default function SmartNationPage() {
  return (
    <div className="bg-white min-h-screen">
      <SmartNation />
      <MoreWorks current="/works/smartNation" />
    </div>
  );
}