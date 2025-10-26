import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <section className="flex h-full w-full items-center justify-center overflow-hidden py-32">
      <BackgroundLines className="container flex w-full flex-col items-center justify-center px-4 md:h-full">
        <h2 className="relative z-20 py-2 text-center font-sans text-5xl font-extrabold tracking-tighter md:py-10 lg:text-8xl">
          Page Not Found
        </h2>
        <p className="text-lg text-muted-foreground mx-auto max-w-xl text-center lg:text-xl">
          We couldn't find the page you are looking for
        </p>
        <div className="relative z-20 mt-10 flex w-full max-w-md items-center justify-center gap-3 rounded-full p-1">
          <Button size="lg" onClick={() => window.location.href = '/'}>Back to home page</Button>
        </div>
      </BackgroundLines>
    </section>
  );
};

export default NotFound;


