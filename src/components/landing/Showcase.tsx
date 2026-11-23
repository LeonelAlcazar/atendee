import { landing } from '@/content/landing';
import { RubroShowcase } from './RubroShowcase';

// The answer to the flood: for each rubro, the message that comes in and the
// task that ends done.
export function Showcase() {
  const { showcase } = landing;

  return (
    <section id="rubros" className="scroll-mt-20 pb-24 md:pb-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="text-balance text-headline">
          <span className="block">{showcase.titleLead}</span>{' '}
          <span className="block text-faint">{showcase.titleRest}</span>
        </h2>
        <div className="mt-8 md:mt-12">
          <RubroShowcase
            items={showcase.items}
            labels={{
              tablist: showcase.tablistLabel,
              pause: showcase.pause,
              play: showcase.play,
              linkPrefix: showcase.linkPrefix,
            }}
          />
        </div>
      </div>
    </section>
  );
}
