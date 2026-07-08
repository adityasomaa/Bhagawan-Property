import { TransitionLink } from "@/components/motion/PageTransition";
import { T } from "@/lib/i18n/provider";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70svh] flex-col items-center justify-center pb-24 pt-36 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-display mt-4 max-w-xl text-4xl font-medium tracking-tight text-ink md:text-6xl">
        <T k="nf.title" />
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
        <T k="nf.desc" />
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <TransitionLink href="/" className="btn btn-solid">
          <T k="nf.back" />
        </TransitionLink>
        <TransitionLink href="/properties" className="btn">
          <T k="nf.browse" />
        </TransitionLink>
      </div>
    </section>
  );
}
