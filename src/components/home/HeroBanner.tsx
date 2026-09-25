import Image from "next/image";
import HeroHeadline from "./HeroHeadline";
import { SiteSettings } from "@/types/site";

/** Used when the admin has not set a banner (or clears the field). */
const FALLBACK_BANNER = "/banner.jpeg";

/**
 * The bundled banner artwork is 1600x777 with its wordmark baked into the left
 * half. Rather than letterboxing it down to an unreadable strip on phones, the
 * crop tightens as the viewport narrows (object-left keeps the wordmark in
 * frame), and the full, uncropped artwork is shown from `lg` up where there is
 * room. The CTAs live in the band below so they never sit over the artwork.
 *
 * The image itself is admin-managed via Settings → Hero → Main Banner Image;
 * a replacement of a different shape still fills the frame via object-cover.
 */
export default function HeroBanner({ settings }: { settings: SiteSettings }) {
  const bannerSrc = settings.heroBannerUrl?.trim() || FALLBACK_BANNER;

  return (
    <section className="bg-am-dark">
      <div className="relative mx-auto w-full max-w-[1600px]">
        <div className="relative aspect-[5/4] w-full xs:aspect-[3/2] sm:aspect-[2/1] lg:aspect-[1600/777]">
          <Image
            src={bannerSrc}
            alt={`${settings.siteName} — ${settings.heroBadge}`}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-left lg:object-center"
          />
        </div>
      </div>

      <HeroHeadline settings={settings} />
    </section>
  );
}
