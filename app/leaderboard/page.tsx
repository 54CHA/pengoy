"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Flame, Trophy, Medal, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Profile, getLeaderboard } from "@/lib/database";

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="w-8 h-8 text-yellow-400" />;
    case 2:
      return <Medal className="w-8 h-8 text-gray-300" />;
    case 3:
      return <Medal className="w-8 h-8 text-orange-600" />;
    default:
      return <Star className="w-6 h-6 text-gray-600" />;
  }
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
                "glass-card hover:bg-gray-900/70 transition-all duration-300 hover:scale-[1.02] group",
                entry.rank <= 3 && "hover:glow"
              )}
            >
              <div className="flex items-center p-3 sm:p-4 md:p-6 gap-3 sm:gap-6">
                <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16">
                  {getRankIcon(entry.rank)}
                </div>

                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-700/50">
                  <img
                    src={entry.image_url}
                    alt={entry.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-grow min-w-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-1 sm:mb-2 truncate">
                    {entry.name}
                  </h3>
                  <div className="flex items-center gap-3 sm:gap-6 text-sm sm:text-base">
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                      <span className="text-orange-200 font-medium">
                        {entry.votes} голосов
                      </span>
                    </span>
                    <span className="text-gray-500 hidden sm:inline">•</span>
                    <span className="text-green-400 font-medium hidden sm:inline">
                      {entry.win_rate}% win rate
                    </span>
                  </div>
                </div>

                <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-500 to-pink-500">
                  #{entry.rank}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link href="/compare">
            <Button
              size="lg"
              className="fire-gradient hover:opacity-90 text-white px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:glow"
            >
              Голосовать
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
