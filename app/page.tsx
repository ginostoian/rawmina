import { CategoriesSection } from "@/components/sections/categories-section";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Hero } from "@/components/sections/hero";
import { HowToOrder } from "@/components/sections/how-to-order";
import { StoryTeaser } from "@/components/sections/story-teaser";
import { TrustBand } from "@/components/sections/trust-band";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBand />
      <CategoriesSection />
      <FeaturedProducts extended />
      <StoryTeaser />
      <HowToOrder />
    </main>
  );
}
