import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Trophy } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,0,0.1)_0%,transparent_50%)] animate-pulse" />

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
              className="w-full sm:w-auto fire-gradient hover:opacity-90 text-white px-6 md:px-10 py-6 md:py-7 text-base md:text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:glow"
            >
              Начать Сравнение{" "}
              <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5" />
            </Button>
          </Link>
          <Link href="/leaderboard" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto glass-card text-white hover:bg-gray-800/50 border-gray-700/50 px-6 md:px-10 py-6 md:py-7 text-base md:text-lg rounded-2xl hover:scale-105 transition-all duration-300"
            >
              Таблица Лидеров <Trophy className="ml-2 w-4 md:w-5 h-4 md:h-5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </main>
  );
}

