"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Flame, Trophy, Medal, Star, Sparkles, Swords, Crown, Shield, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Profile, getLeaderboard } from "@/lib/database";

function getRankDisplay(rank: number) {
  const baseClasses = "flex items-center gap-1.5 font-bold justify-center";
  
  if (rank === 1) {
    return (
      <div className={cn(baseClasses, "text-2xl sm:text-3xl")}>
        <div className="relative">
          <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
          <div className="absolute inset-0 text-yellow-400 animate-ping opacity-50" />
        </div>
        <span className="hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 animate-gradient">
          #{rank}
        </span>
      </div>
    );
  }
  
  if (rank <= 3) {
    return (
      <div className={cn(baseClasses, "text-xl sm:text-2xl")}>
        <Medal className="hidden sm:block w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-400">
          #{rank}
        </span>
      </div>
    );
  }
  
  if (rank <= 5) {
    return (
      <div className={cn(baseClasses, "text-lg sm:text-xl")}>
        <Star className="hidden sm:inline w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
        <span className="text-pink-400">
          #{rank}
        </span>
      </div>
    );
  }

  if (rank <= 10) {
    return (
      <div className={cn(baseClasses, "text-base sm:text-lg")}>
        <Sparkles className="hidden sm:inline w-4 h-4 sm:w-5 sm:h-5 text-rose-400/80" />
        <span className="text-rose-400">
          #{rank}
        </span>
      </div>
    );
  }
  
  return (
    <div className={cn(baseClasses, "text-base sm:text-lg")}>
      <Sparkles className="hidden sm:inline w-4 h-4 sm:w-5 sm:h-5 text-gray-400/80" />
      <span className="text-gray-400">
        #{rank}
      </span>
    </div>
  );
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard();
      setLeaderboard(data);
      setIsLoading(false);
    };

    fetchLeaderboard();
  }, []);

  return (
    <main className="min-h-screen gradient-bg py-8 sm:py-12 md:py-16 px-3 sm:px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,0,0.1)_0%,transparent_50%)] animate-pulse" />

      <div className="container max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500">
            Топ 15 Лидеров
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl">
            Самые популярные по вашему мнению
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {leaderboard.map((entry) => (
            <Card
              key={entry.id}
              className={cn(
                "glass-card relative overflow-hidden transition-all duration-300 hover:scale-[1.02] group",
                entry.rank <= 3 ? "border-orange-500/30" : "border-gray-800",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/10 before:via-white/5 before:to-black/10",
                "hover:before:translate-x-full before:transition-transform before:duration-700",
              )}
            >
              <div className="flex items-center p-2.5 sm:p-4 md:p-6 gap-1.5 sm:gap-6 relative">
                {/* Left side: Rank */}
                <div className="flex-shrink-0 w-[32px] sm:w-[80px] flex justify-center">
                  {getRankDisplay(entry.rank)}
                </div>

                {/* Center: Avatar and Name */}
                <div className="flex items-center gap-2 sm:gap-3 flex-grow min-w-0">
                  <div className="relative w-8 h-8 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 ring-2 ring-gray-700/50 group-hover:ring-orange-500/30 transition-all duration-300 rounded-full" />
                    <img
                      src={entry.image_url}
                      alt={entry.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="min-w-0 flex-shrink">
                    <h3 className="text-sm sm:text-xl md:text-2xl font-semibold text-white truncate pr-1">
                      {entry.name}
                    </h3>
                  </div>
                </div>

                {/* Right side: Stats */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-3 ml-auto">
                  <div className="group/stat relative"> 
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-orange-500/20 via-rose-500/20 to-orange-500/20 rounded-lg blur-sm opacity-75 group-hover/stat:opacity-100 transition-all duration-300" />
                    <div className="relative flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-gradient-to-r from-black/40 to-black/40 border border-orange-500/20 group-hover/stat:border-orange-500/40">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 group-hover/stat:text-orange-300" />
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-0 sm:gap-1">
                        <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-orange-400/70">WR</span>
                        <span className="text-orange-400 font-bold text-xs sm:text-lg leading-none group-hover/stat:text-orange-300">
                          {entry.win_rate}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="group/stat relative">
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-pink-500/20 rounded-lg blur-sm opacity-75 group-hover/stat:opacity-100 transition-all duration-300" />
                    <div className="relative flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-gradient-to-r from-black/40 to-black/40 border border-pink-500/20 group-hover/stat:border-pink-500/40">
                      <Swords className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400 group-hover/stat:text-pink-300" />
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-0 sm:gap-1">
                        <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-pink-400/70">ELO</span>
                        <span className="text-pink-400 font-bold text-xs sm:text-lg leading-none group-hover/stat:text-pink-300">
                          {entry.elo_rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link href="/compare">
            <Button
              size="lg"
              className="group relative overflow-hidden px-8 sm:px-12 py-6 sm:py-8 
                         text-base sm:text-lg rounded-2xl transition-all duration-500 
                         hover:scale-105 transform"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-rose-500 to-orange-500 
                              animate-gradient opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform 
                              duration-1000 ease-in-out" />
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-rose-500 to-orange-500 
                              rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500 
                              animate-pulse" />
              
              {/* Inner shadow for depth */}
              <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-r from-black/50 via-black/25 
                              to-black/50 opacity-20" />
              
              {/* Button content */}
              <div className="relative flex items-center justify-center gap-2 text-white font-medium">
                <span className="tracking-wide">Голосовать</span>
                <Flame className="w-5 h-5 animate-pulse group-hover:animate-none
                                 group-hover:rotate-12 transition-transform duration-1000" />
              </div>
              
              {/* Border glow */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 group-hover:ring-white/40 
                              transition-all duration-500" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
