import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Heart, Trophy } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,0,0.1)_0%,transparent_50%)] animate-pulse" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,69,0,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,69,0,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent animate-shimmer" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent animate-shimmer-delayed" />
      </div>

      <div className="text-center max-w-3xl mx-auto relative z-10">
        <div className="mb-12 flex justify-center float-animation">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-2xl bg-orange-500/20" />
            <Flame className="w-24 h-24 text-orange-500 relative z-10" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 animate-gradient leading-normal sm:leading-loose lg:leading-snug">
          <span className="text-orange-100">Poly</span>Enjoyers
        </h1>

       
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
          <Link href="/compare" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto relative group overflow-hidden
                fire-gradient hover:opacity-90 text-white 
                px-6 md:px-10 py-6 md:py-7 text-base md:text-lg rounded-2xl
                shadow-[0_0_20px_rgba(255,69,0,0.3)] hover:shadow-[0_0_25px_rgba(255,69,0,0.5)]
                transition-all duration-500 hover:scale-105 transform"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-rose-500/20 to-orange-500/20 blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
              <div className="absolute -inset-[1px] bg-gradient-to-r from-orange-500 via-rose-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500" />
              <div className="relative flex items-center justify-center">
                Начать Сравнение
                <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Button>
          </Link>
          <Link href="/leaderboard" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto relative group overflow-hidden
                glass-card text-white hover:text-pink-200
                px-6 md:px-10 py-6 md:py-7 text-base md:text-lg rounded-2xl
                border-2 border-gray-700/50 hover:border-pink-500/50
                shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(236,72,153,0.3)]
                transition-all duration-500 hover:scale-105 transform"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-[1px] bg-gradient-to-r from-pink-500/30 via-rose-500/30 to-pink-500/30 rounded-2xl opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-500" />
              <div className="relative flex items-center justify-center">
                Таблица Лидеров
                <Trophy className="ml-2 w-4 md:w-5 h-4 md:h-5 group-hover:rotate-12 transition-transform duration-500" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
     
      <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none " />
       <footer className="py-6 text-center text-sm text-gray-100">
            <p className="flex items-center justify-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 animate-pulse" /> by ITMO students
            </p>
          </footer>
    </main>
  );
}

