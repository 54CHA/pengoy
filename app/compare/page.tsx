"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Flame, Trophy, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Profile, getRandomProfiles, updateVotes } from "@/lib/database";
import { useToast } from "@/hooks/use-toast";
import { usePreloadImages } from "@/lib/hooks/use-preload-images";

export default function ComparePage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [nextProfiles, setNextProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { preloadImages } = usePreloadImages();
  const router = useRouter();
  const { toast } = useToast();

  const fetchAndPreloadProfiles = async () => {
    const newProfiles = await getRandomProfiles(2);
    const nextProfiles = await getRandomProfiles(2);
    
    // Preload next profile images
    await preloadImages(nextProfiles.map(p => p.image_url));
    
    return { newProfiles, nextProfiles };
  };

  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      const { newProfiles, nextProfiles } = await fetchAndPreloadProfiles();
      setProfiles(newProfiles);
      setNextProfiles(nextProfiles);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setSelectedProfile(null);
    
    toast({
      title: "Пропущено",
      description: "Загрузка новых профилей...",
      duration: 1000
    });

    // Use the preloaded profiles and fetch the next set
    setProfiles(nextProfiles);
    const { nextProfiles: newNextProfiles } = await fetchAndPreloadProfiles();
    setNextProfiles(newNextProfiles);
    setIsLoading(false);
  };

  const handleVote = async (profileId: number) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setSelectedProfile(profileId);
    
    const winner = profiles.find(p => p.id === profileId);
    const loser = profiles.find(p => p.id !== profileId);
    
    if (winner && loser) {
      const success = await updateVotes(winner.id, loser.id);
      
      if (success) {
       
      } else {
        console.error('Failed to update votes');
        toast({
          title: "Ошибка",
          description: "Не удалось обновить голос",
          duration: 500
        });
      }
    }

    // Use the preloaded profiles and fetch the next set
    setTimeout(async () => {
      setProfiles(nextProfiles);
      const { nextProfiles: newNextProfiles } = await fetchAndPreloadProfiles();
      setNextProfiles(newNextProfiles);
      setSelectedProfile(null);
      setIsLoading(false);
    }, 250);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

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
                    onClick={() => handleVote(profile.id)}
                  >
                    <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                      <div className="relative w-full h-full animate-fadeIn">
                        <img
                          src={profile.image_url}
                          alt={profile.name}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      </div>
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
