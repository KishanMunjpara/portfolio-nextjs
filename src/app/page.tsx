import SiteShell from '@/components/site/SiteShell';
import HomeHero from '@/components/site/HomeHero';

export default function HomePage() {
  return (
    <SiteShell variant="home">
      <HomeHero />
    </SiteShell>
  );
}
