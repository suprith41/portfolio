import SkinSage from '../../components/works-pages/skinSage';
import MoreWorks from '../../components/works-pages/MoreWorks';

export default function SkinSagePage() {
  return (
    <div className="bg-white min-h-screen">
      <SkinSage />
      <MoreWorks current="/works/skinSage" />
    </div>
  );
}
