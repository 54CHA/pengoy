import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flame, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen gradient-bg relative flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,0,0.1)_0%,transparent_50%)] animate-pulse" />
      
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 animate-pulse">
            404
          </h1>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Страница не найдена
          </h2>
          <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Кажется, страница, которую вы ищете, не существует или была перемещена.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 min-[400px]:items-center justify-center">
          <Link href="/">
            <Button
              variant="outline"
              className="glass-card text-white hover:bg-orange-500/20 border-orange-500/30 hover:scale-105 transition-all duration-300 hover:border-orange-500/50"
            >
              <Home className="mr-2 h-4 w-4 text-orange-400" />
              На главную
            </Button>
          </Link>
          
          <Link href="/compare">
            <Button
              variant="outline"
              className="glass-card text-white hover:bg-pink-500/20 border-pink-500/30 hover:scale-105 transition-all duration-300 hover:border-pink-500/50"
            >
              <Flame className="mr-2 h-4 w-4 text-pink-400" />
              Начать голосование
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}