import BlumeHealth from '../../components/works-pages/blumeHealth';
import MoreWorks from '../../components/works-pages/MoreWorks';

export default function BlumeHealthPage() {
  return (
    <div className="bg-white min-h-screen">
      <BlumeHealth />
      <MoreWorks current="/works/blumeHealth" />
    </div>
  );
}
