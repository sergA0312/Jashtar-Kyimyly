interface FooterLink {
  titleKey: string; // вместо title
  url: string;
}

interface FooterSection {
  titleKey?: string; // необязательный, если нужна заголовок секции
  links: FooterLink[];
}

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    links: [
      { titleKey: "aboutTheMovement", url: "movementpages" },
      { titleKey: "direction", url: "movementpages" },
      { titleKey: "Projects", url: "project" },
      { titleKey: "Events", url: "events" },
      { titleKey: "regionalOffice", url: "branchnamepages" },
    ],
  },
  {
    links: [
      { titleKey: "news", url: "news" },
      { titleKey: "brandMaterials", url: "main" },
      { titleKey: "Media", url: "media" },
    ],
  },
  {
    links: [
      { titleKey: "ourSocialNetwork", url: "" },
      { titleKey: "Instagram", url: "https://instagram.com/your_club" },
      { titleKey: "Facebook", url: "https://facebook.com/your_club" },
      { titleKey: "YouTube", url: "https://youtube.com/your_club" },
    ],
  },
  {
    links: [
      { titleKey: "contact", url: "#" }, 
      { titleKey: "WhatsApp", url: "#" }, 
      { titleKey: "Telegram", url: "tel:+996XXXXXXXXX" },
    ],
  },
  {
    links: [
      { titleKey: "gmail", url: "#" },
      { titleKey: "gmailAddress", url: "#" },
    ],
  },
  {
    links: [
      { titleKey: "address", url: "#" }, 
      { titleKey: "streetAndHouse", url: "" },
    ],
  },
];
