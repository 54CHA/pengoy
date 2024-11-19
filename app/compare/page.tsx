"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Flame, Trophy, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Profile, getRandomProfiles, updateVotes } from "@/lib/database";
import { useToast } from "@/hooks/use-toast";

export default function ComparePage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const fetchProfiles = async () => {
    setIsLoading(true);
    const newProfiles = await getRandomProfiles(2);
    setProfiles(newProfiles);
    setIsLoading(false);
  };

  const handleSkip = async () => {
    setSelectedProfile(null);
    toast({
      title: "Пропущено",
      description: "Загрузка новых профилей...",
      duration: 1000
    });
    await fetchProfiles();
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleVote = async (profileId: number) => {
    if (isLoading) return; // Prevent double votes while loading
    
    setIsLoading(true);
    setSelectedProfile(profileId.toString());
    
    const winner = profiles.find(p => p.id === profileId.toString());
    const loser = profiles.find(p => p.id !== profileId.toString());
    
    if (winner && loser) {
      const success = await updateVotes(parseInt(winner.id), parseInt(loser.id));
      
      if (success) {
        toast({
          title: "Голос учтен!",
          description: `Вы проголосовали за ${winner.name}`,
          duration: 500
        });
      }
    }

    setTimeout(() => {
      setSelectedProfile(null);
      fetchProfiles();
    }, 250);
  };

  return (
    <main className="min-h-screen gradient-bg relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,0,0.1)_0%,transparent_50%)] animate-pulse" />

      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 flex-1 flex flex-col">
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-4xl mt-10 lg:mt-5 sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500">
              Who&apos;s Hotter?
            </h1>
          </div>

          <div className="flex-1 flex items-center">
            <div className="w-full grid grid-cols-2 gap-2 sm:gap-4 md:gap-8 max-w-3xl mx-auto">
              {profiles.map((profile) => (
                <div key={profile.id}>
                  <Card
                    className={cn(
                      "w-full cursor-pointer transform transition-all duration-500 hover:scale-[1.02] glass-card overflow-hidden",
                      selectedProfile === profile.id &&
                        "ring-2 ring-orange-500 glow"
                    )}
                    onClick={() => handleVote(parseInt(profile.id))}
                  >
                    <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                      {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all duration-300">
                          <Loader2 className="w-8 h-8 text-orange-500/70 animate-spin" />
                        </div>
                      ) : (
                        <div className="relative w-full h-full animate-fadeIn">
                          <img
                            src={profile.image_url}
                            alt={profile.name}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 md:p-6 text-center">
                        <h2 className="text-sm sm:text-xl md:text-2xl font-bold text-white truncate">
                          {profile.name}
                        </h2>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-4 sm:mt-8 flex-col items-center relative z-10">
            <div className="flex gap-4 flex-col sm:flex-row items-center sm:gap-6">
              <Button
                variant="outline"
                className="glass-card text-white hover:bg-orange-500/20 border-orange-500/30 hover:scale-105 transition-all duration-300 hover:border-orange-500/50 px-4 sm:px-6"
                onClick={handleSkip}
                disabled={isLoading}
              >
                <span className="mr-2">Пропустить</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              </Button>

              <Link href="/leaderboard">
                <Button
                  variant="outline"
                  className="glass-card text-white hover:bg-pink-500/20 border-pink-500/30 hover:scale-105 transition-all duration-300 hover:border-pink-500/50 px-4 sm:px-6"
                >
                  <span className="mr-2">Лидерборд</span>
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
                </Button>
              </Link>
            </div>

            <Button
              variant="ghost"
              className="text-gray-400 hover:text-pink-400 hover:bg-transparent hover:underline text-sm mt-4 cursor-pointer"
              onClick={() => {
                console.log('Button clicked');
                router.push('/remove-profile');
              }}
            >
              Хотите удалить свой профиль?
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
