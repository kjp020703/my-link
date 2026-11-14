"use client";

import React from "react";
import { DividerBlock as DividerBlockType } from "@/types";

interface DividerBlockProps {
  block?: DividerBlockType;
}

export function DividerBlock({ block: _block }: DividerBlockProps) {
  return (
    <div className="w-full py-2">
      <hr className="border-t border-white/20" />
    </div>
  );
}
