'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function RemoveProfilePage() {
  return (
    <main className="min-h-screen gradient-bg relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,59,0,0.1)_0%,transparent_50%)] animate-pulse" />

      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col max-w-2xl relative z-10">
          <div className="mb-8 flex items-center gap-2 text-gray-400">
          <Link 
              href="/compare"
              className="hover:text-pink-400 transition-colors"
            >
              Сравнение
            </Link>
          
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-300">Удаление профиля</span>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-2xl before:hidden sm:before:block">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 pb-1">
              Запрос на удаление профиля
              
            </h1>
            
            <div className="space-y-4 text-gray-300">
              <p>Для обеспечения безопасности и конфиденциальности наших пользователей, перед удалением профиля требуется верификация. Пожалуйста, следуйте этим шагам:</p>
              
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>Войдите в свой аккаунт VK</li>
                <li>Сделайте скриншот своей страницы профиля в авторизованном состоянии</li>
                <li>Отправьте скриншот в наш Telegram: <a href="https://t.me/polyenjoyers" className="text-orange-400 hover:text-orange-300 underline" target="_blank" rel="noopener noreferrer">@polyenjoyers</a></li>
              </ol>

              <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                <p className="text-sm text-gray-400">
                  Примечание: Мы обработаем ваш запрос на удаление в течение 24 часов после верификации. Ваша конфиденциальность и безопасность важны для нас.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}