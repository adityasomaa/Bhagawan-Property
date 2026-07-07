import { TransitionLink } from "@/components/motion/PageTransition";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70svh] flex-col items-center justify-center pb-24 pt-36 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-display mt-4 max-w-xl text-4xl font-medium tracking-tight text-ink md:text-6xl">
        This page has moved on — like the best listings do
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been relocated. Let us walk you
        back to somewhere beautiful.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <TransitionLink href="/" className="btn btn-solid">
          Back Home
        </TransitionLink>
        <TransitionLink href="/properties" className="btn">
          Browse Properties
        </TransitionLink>
      </div>
    </section>
  );
}
