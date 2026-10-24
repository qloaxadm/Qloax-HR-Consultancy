import type { MediaAsset } from "@/lib/types";
import atriumWalk from "@/assets/images/atrium-walk.jpg";
import facadeGrid from "@/assets/images/facade-grid.jpg";
import harpaWindow from "@/assets/images/harpa-window.jpg";
import buildingCorner from "@/assets/images/building-corner.jpg";
import conversation from "@/assets/images/conversation.jpg";
import museumLobby from "@/assets/images/museum-lobby.jpg";

/**
 * Development imagery, licensed under the Unsplash License (free for
 * commercial use, no permission required). All files were cropped and
 * given a shared monochrome treatment for this site. Pending client
 * approval — swap for commissioned photography when available. None of
 * the people pictured are Vantage People staff, consultants, or clients.
 */
export const MEDIA = {
  atriumWalk: {
    src: atriumWalk,
    alt: "A lone figure crossing the polished floor of a vast, dimly lit atrium beneath tall windows.",
    credit: {
      photographer: "Sebastian Schuster",
      url: "https://unsplash.com/photos/hJkRfMpLnjE",
      license: "Unsplash License",
    },
  },
  facadeGrid: {
    src: facadeGrid,
    alt: "",
    credit: {
      photographer: "Sebastian Schuster",
      url: "https://unsplash.com/photos/OWsaQTyS914",
      license: "Unsplash License",
    },
  },
  harpaWindow: {
    src: harpaWindow,
    alt: "A person in silhouette looking out through a wall of angular glass panes toward the sea.",
    credit: {
      photographer: "Fabian Møller",
      url: "https://unsplash.com/photos/iiGRiBRrcok",
      license: "Unsplash License",
    },
  },
  buildingCorner: {
    src: buildingCorner,
    alt: "The corner of a tall building, one face in bright light and the other in deep shadow.",
    credit: {
      photographer: "Sebastian Schuster",
      url: "https://unsplash.com/photos/LD-M-bzJgNY",
      license: "Unsplash License",
    },
  },
  conversation: {
    src: conversation,
    alt: "Two people in conversation across a café table by a large window.",
    credit: {
      photographer: "Ben Moreland",
      url: "https://unsplash.com/photos/uR4ICNvIVvM",
      license: "Unsplash License",
    },
  },
  museumLobby: {
    src: museumLobby,
    alt: "People walking through a lobby framed by sweeping, sculptural concrete arches.",
    credit: {
      photographer: "Yucel M",
      url: "https://unsplash.com/photos/CCexwt3Rl4A",
      license: "Unsplash License",
    },
  },
} satisfies Record<string, MediaAsset>;
