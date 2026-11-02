"use client";

import React, { useState } from "react";
import { MyLinkProfile } from "@/types";
import { Mail } from "lucide-react";
import {
  GithubIcon,
  YoutubeIcon,
  TwitterXIcon,
  InstagramIcon,
} from "@/components/icons/BrandIcons";

interface ProfileHeaderProps {
  profile: MyLinkProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const [imageError, setImageError] = useState(false);

  // 이니셜 추출
  const initials = profile.displayName
    ? profile.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "ML";

  return (
    <header className="flex flex-col items-center text-center space-y-3 mb-6 w-full">
      {/* 아바타 이미지 영역 */}
      <div className="relative group">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-white/20 backdrop-blur-md shadow-xl ring-2 ring-white/40 transition-transform duration-300 group-hover:scale-105">
          {!imageError && profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.displayName}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-white/30 flex items-center justify-center font-bold text-2xl text-white">
              {initials}
            </div>
          )}
        </div>
      </div>

      {/* 이름 & 사용자 핸들 */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight drop-shadow-sm">
          {profile.displayName}
        </h1>
        {profile.username && (
          <p className="text-sm font-medium opacity-85 tracking-wide">
            @{profile.username}
          </p>
        )}
      </div>

      {/* Bio 소개글 */}
      {profile.bio && (
        <p className="text-sm sm:text-base leading-relaxed opacity-95 max-w-sm whitespace-pre-line px-2 font-normal">
          {profile.bio}
        </p>
      )}

      {/* 소셜 아이콘 바 */}
      {profile.socials && Object.keys(profile.socials).length > 0 && (
        <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
          {profile.socials.instagram && (
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-110 shadow-sm"
            >
              <InstagramIcon className="w-5 h-5 text-pink-400" />
            </a>
          )}
          {profile.socials.youtube && (
            <a
              href={profile.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-110 shadow-sm"
            >
              <YoutubeIcon className="w-5 h-5 text-red-400" />
            </a>
          )}
          {profile.socials.twitter && (
            <a
              href={profile.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-110 shadow-sm"
            >
              <TwitterXIcon className="w-5 h-5 text-sky-400" />
            </a>
          )}
          {profile.socials.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-110 shadow-sm"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          )}
          {profile.socials.email && (
            <a
              href={
                profile.socials.email.startsWith("mailto:")
                  ? profile.socials.email
                  : `mailto:${profile.socials.email}`
              }
              aria-label="Email"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-110 shadow-sm"
            >
              <Mail className="w-5 h-5 text-emerald-300" />
            </a>
          )}
        </div>
      )}
    </header>
  );
}
