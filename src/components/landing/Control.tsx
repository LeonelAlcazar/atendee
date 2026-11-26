import { Power, UserRound } from 'lucide-react';
import { ProductPreview } from '@/components/ui/ProductPreview';
import { landing } from '@/content/landing';

const icons = [UserRound, Power];

// The team stays in charge: the inbox, and the two switches that silence the
// assistant.
export function Control() {
  const { control } = landing;

  return (
    <section id="control" className="scroll-mt-20 pb-24 md:pb-36">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <h2 className="text-balance text-headline">
            <span className="block">{control.titleLead}</span>{' '}
            <span className="block text-faint">{control.titleRest}</span>
          </h2>
          <p className="mt-5 max-w-lg text-pretty text-lead text-muted">
            {control.description}
          </p>
          {/* Each <div> holds exactly one dt/dd pair; the icon lives in the
              dt, so the list stays valid for assistive technology. */}
          <dl className="mt-8 grid max-w-lg gap-5">
            {control.points.map((point, index) => {
              const Icon = icons[index];
              return (
                <div key={point.title} className="relative min-h-11 pl-15">
                  <dt className="font-semibold tracking-[-0.01em]">
                    <span
                      className="absolute left-0 top-0 grid size-11 place-items-center rounded-full bg-surface shadow-card"
                      aria-hidden="true"
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    {point.title}
                  </dt>
                  <dd className="mt-0.5 leading-relaxed text-muted">{point.text}</dd>
                </div>
              );
            })}
          </dl>
        </div>

        <ProductPreview />
      </div>
    </section>
  );
}
