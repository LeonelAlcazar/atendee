import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] grid place-items-center px-5 md:px-8 py-20">
      <div className="max-w-2xl text-center flex flex-col items-center gap-6">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute">
          Error 404
        </span>
        <h1 className="font-display font-semibold text-7xl md:text-9xl tracking-[-0.025em] leading-[0.9]">
          No <span className="text-coral">atendemos</span> esto.
        </h1>
        <p className="font-body text-lg text-mute max-w-md">
          La página que buscás no existe — o ya no existe. Volvé al inicio o escribinos.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button href="/" variant="primary" size="md">
            Volver al inicio
          </Button>
        </div>
      </div>
    </section>
  );
}
