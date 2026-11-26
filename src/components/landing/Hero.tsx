import { landing } from '@/content/landing';
import { HeroScene } from './HeroScene';
import { HeroHeadline } from './HeroHeadline';
import { HeroStart } from './HeroStart';

// The funnel starts on the home: the finished task as the headline, one line
// that names the connection, and one field to start the assistant.
export function Hero() {
  const { hero } = landing;

  return (
    <section>
      <div className="mx-auto max-w-7xl px-5 pt-10 text-center md:px-8 md:pt-14">
        <HeroHeadline
          lead={hero.titleLead}
          rest={hero.titleRest}
          actions={hero.actions}
          actionDurationMs={hero.actionDurationMs}
          pause={hero.pause}
          play={hero.play}
        />
        <p className="mx-auto mt-5 max-w-2xl text-balance text-lead text-muted md:mt-6">
          {hero.description}
        </p>
        <HeroStart />
      </div>
      <HeroScene />
    </section>
  );
}
