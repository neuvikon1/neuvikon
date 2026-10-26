/**
 * The site's English content. The Turkish edition is `content.tr.ts`; the
 * types and the shape both follow are in `content.ts`.
 *
 * Ported from the previous site (neuvikon-labs.github.io).
 */

import type { About, Careers, Division, Org, ProjectStatus } from "./content";

export const org: Org = {
  name: "Neuvikon",
  tagline: "Software, games and robotics.",
  description:
    "Neuvikon is an independent technology studio working across product " +
    "development, mobile games and embedded systems. We design, build and " +
    "ship the work in our three divisions end to end, in house.",
  email: "neuvikon@gmail.com",
  year: 2026,
};

export const statusLabel: Record<ProjectStatus, string> = {
  released: "Released",
  building: "In development",
};

export const divisions: Division[] = [
  {
    slug: "games",
    name: "Neuvikon Games",
    short: "Games",
    tagline:
      "Mobile games — multiplayer, and the kind you finish in one sitting.",
    intro:
      "Games builds short-session mobile games that take seconds to learn and " +
      "a long time to master. Every stage happens inside the studio: design, " +
      "networking, art and store release.",
    capabilities: [],
    projects: [
      {
        name: "PushBump",
        tagline: "Tilt, charge, release. One shove changes everything.",
        description:
          "An online multiplayer mobile arena game. You move by tilting the " +
          "phone, then charge a shot and let it go. Characters with their own " +
          "weapons and abilities, four arenas, a bot mode and a defence mode.",
        status: "building",
        tags: ["Arena", "Action", "Multiplayer", "Mobile"],
        image: "/apps/pushbump.png",
        media: [
          { src: "/media/pushbump/store-en-01.jpg", alt: "Push. Bump. Win. — an arcade shape brawler" },
          { src: "/media/pushbump/store-en-02.jpg", alt: "17 unique shape heroes" },
          { src: "/media/pushbump/store-en-03.jpg", alt: "Pick your hero" },
          { src: "/media/pushbump/store-en-04.jpg", alt: "Survive endless waves" },
          { src: "/media/pushbump/store-en-05.jpg", alt: "Level up your build" },
          { src: "/media/pushbump/store-en-06.jpg", alt: "Unlock legendary skins" },
          { src: "/media/pushbump/store-en-07.jpg", alt: "Daily rewards, quests and streaks" },
        ],
      },
      {
        name: "Neu-Pummel Party",
        tagline: "Two to eight phones, forty minigames, one room.",
        description:
          "A party game played on phones. One person hosts, everyone else " +
          "joins from a list on the same Wi-Fi — no IP addresses, no accounts; " +
          "a six-digit room code covers play over the internet. Each round " +
          "pulls one of forty minigames, and every game has three arena " +
          "variants and its own bot AI. There is not a single binary art " +
          "asset in the repository: all visuals and sound are generated in " +
          "code at runtime. No ads, no in-app purchases.",
        status: "building",
        tags: ["Party game", "Minigames", "Local multiplayer", "2-8 players"],
        image: "/apps/neuparty.png",
        media: [
          { src: "/media/neu-pummel-party/store-en-01.jpg", alt: "40 minigames, one party" },
          { src: "/media/neu-pummel-party/store-en-02.jpg", alt: "Same Wi-Fi, instant room" },
          { src: "/media/neu-pummel-party/store-en-03.jpg", alt: "Think fast, tap faster" },
          { src: "/media/neu-pummel-party/store-en-04.jpg", alt: "A new game every round" },
          { src: "/media/neu-pummel-party/store-en-05.jpg", alt: "Team 2v2 and Grand Prix" },
          { src: "/media/neu-pummel-party/store-en-06.jpg", alt: "No ads, just party" },
        ],
      },
      {
        name: "Shardbound",
        tagline: "Every kill leaves a soul. Every soul can stand back up.",
        description:
          "A top-down roguelite dungeon crawler for PC and Android. Five " +
          "heroes, three acts of branching rooms, elites, mini-bosses and " +
          "bosses. The Necromancer raises the fallen as a shadow army that " +
          "levels up, wears gear and takes formation orders. Between runs, " +
          "shards buy permanent upgrades at the camp; Heat modifiers make " +
          "each new run harder and better paid.",
        status: "building",
        tags: ["Roguelite", "Dungeon crawler", "Action", "PC", "Android"],
        image: "/apps/shardbound.png",
        media: [
          { src: "/media/shardbound/01.jpg", alt: "Camp: choose your hero around the fire", wide: true },
          { src: "/media/shardbound/02.jpg", alt: "Hero panel: the Necromancer and the Arise skill", wide: true },
          { src: "/media/shardbound/03.jpg", alt: "Act 1 map: Mossy Catacombs, choose your path", wide: true },
          { src: "/media/shardbound/04.jpg", alt: "The Necromancer enters a room with four skeletons", wide: true },
          { src: "/media/shardbound/05.jpg", alt: "Fight: the shadow army against goblins and a boar", wide: true },
          { src: "/media/shardbound/06.jpg", alt: "Choose a blessing: one boon for the road ahead", wide: true },
          { src: "/media/shardbound/07.jpg", alt: "Shadow Army: levels, gear and formation orders", wide: true },
          { src: "/media/shardbound/08.jpg", alt: "The Forge: permanent upgrades and weapon blueprints", wide: true },
          { src: "/media/shardbound/09.jpg", alt: "Bosses and mini-bosses across the three acts", wide: true },
        ],
      },
      {
        name: "UnderCard",
        tagline: "Call it when your hand is lowest. Be wrong and you lose.",
        description:
          "A real-time multiplayer mobile card game in the Cabo family. Two " +
          "to eight players join with a four-digit room code or an invite " +
          "link, and room state syncs through Firestore. Bots at three " +
          "difficulties, a fully offline single-player mode, reconnection, " +
          "ability and event cards, three themes and two languages.",
        status: "building",
        tags: ["Card game", "Strategy", "Multiplayer", "2-8 players"],
        image: "/apps/undercard.png",
        media: [
          { src: "/media/undercard/01.jpg", alt: "Home menu and daily challenge" },
          { src: "/media/undercard/02.jpg", alt: "Game lobby with bots" },
          { src: "/media/undercard/03.jpg", alt: "Game table" },
          { src: "/media/undercard/04.jpg", alt: "Drawing a card: replace or discard" },
          { src: "/media/undercard/05.jpg", alt: "Event card: Tax" },
          { src: "/media/undercard/06.jpg", alt: "Round results and standings" },
        ],
      },
      {
        name: "EdgeOut",
        tagline: "Push six of your opponent's marbles off the board.",
        description:
          "Competitive online push strategy on a hexagonal board, using the " +
          "Abalone rule set. Client and server share the same rule engine: " +
          "the client previews a move instantly, the server validates it and " +
          "broadcasts the result — so previews feel immediate while cheating " +
          "still hits the server wall. An MMR-windowed matchmaking queue, a " +
          "rank ladder, turn timers and a practice bot.",
        status: "building",
        tags: ["Strategy", "Board game", "Online", "Ranked"],
        image: "/apps/edgeout.png",
        media: [
          { src: "/media/edgeout/01.png", alt: "Starting position: 14 black and 14 white marbles on the 61-cell board" },
          { src: "/media/edgeout/02.png", alt: "Mid-game: three selected white marbles and their legal moves" },
          { src: "/media/edgeout/03.png", alt: "Wall placement mode: available edges highlighted" },
          { src: "/media/edgeout/04.png", alt: "A wall placed by Black blocks the white marbles" },
          { src: "/media/edgeout/05.png", alt: "Sign-in screen" },
        ],
      },
      {
        name: "GuessFast",
        tagline: "Find the number. Find it fast.",
        description:
          "A number-guessing game. Every guess narrows the range; what counts " +
          "is not how many tries you needed but how long you took.",
        status: "released",
        tags: ["Puzzle", "Number guessing", "Daily challenge", "PvP"],
        image: "/apps/guessfast.png",
        links: [
          {
            label: "Google Play",
            href: "https://play.google.com/store/apps/details?id=com.scientist001.GuessFast",
          },
          {
            label: "App Store",
            href: "https://apps.apple.com/ng/app/guessfast/id6758861605",
          },
        ],
        media: [
          { src: "/media/guessfast/store-en-01.jpg", alt: "5 brain games in one app" },
          { src: "/media/guessfast/store-en-02.jpg", alt: "Crack the secret number" },
          { src: "/media/guessfast/store-en-03.jpg", alt: "The closer you get, the more you score" },
          { src: "/media/guessfast/store-en-04.jpg", alt: "A new movie every day" },
          { src: "/media/guessfast/store-en-05.jpg", alt: "Guess the famous person" },
          { src: "/media/guessfast/store-en-06.jpg", alt: "Which one is more?" },
          { src: "/media/guessfast/store-en-07.jpg", alt: "Share and climb the leaderboard" },
          { src: "/media/guessfast/store-en-08.jpg", alt: "Level up, unlock achievements" },
          { src: "/media/guessfast/01.jpg", alt: "Main menu" },
          { src: "/media/guessfast/02.jpg", alt: "Practice game: how many digits are right after each guess" },
          { src: "/media/guessfast/03.jpg", alt: "Indicator mode: right place in green, wrong place in yellow" },
          { src: "/media/guessfast/04.jpg", alt: "PvP mode: create a private room or join with a code" },
          { src: "/media/guessfast/05.jpg", alt: "Settings" },
          { src: "/media/guessfast/06.jpg", alt: "Daily challenge result" },
          { src: "/media/guessfast/07.jpg", alt: "The last seven days" },
        ],
      },
      {
        name: "Kor ve Kül",
        tagline: "Stoke the fire or cool it down — at ten, it overflows.",
        description:
          "A roguelike deckbuilder for portrait mobile, drawn from Turkic-Altai " +
          "mythology. Alaz, a young hearth keeper, descends underground to " +
          "relight the extinguished Great Hearth and fights its creatures with " +
          "cards. At the heart of every fight is Heat: it carries over between " +
          "turns and makes Alaz stronger as it climbs, but at ten it overflows " +
          "and explodes, and cooling it down turns the spent heat into block " +
          "or damage. A branching map, events, a merchant, a hearth to rest " +
          "or forge at, relics and bosses.",
        status: "building",
        tags: ["Roguelike", "Deckbuilder", "Turkish mythology", "Single player"],
        image: "/apps/kor-ve-kul.png",
        media: [
          { src: "/media/kor-ve-kul/01.jpg", alt: "Main menu" },
          { src: "/media/kor-ve-kul/02.jpg", alt: "Combat: Heat gauge, energy and the hand" },
          { src: "/media/kor-ve-kul/03.jpg", alt: "Card close-up" },
          { src: "/media/kor-ve-kul/04.jpg", alt: "The map, climbed bottom to top toward the boss" },
          { src: "/media/kor-ve-kul/05.jpg", alt: "Event: the Old Shaman" },
          { src: "/media/kor-ve-kul/06.jpg", alt: "The hearth: rest or forge a card" },
          { src: "/media/kor-ve-kul/07.jpg", alt: "The wandering merchant" },
          { src: "/media/kor-ve-kul/08.jpg", alt: "Treasure chest" },
          { src: "/media/kor-ve-kul/09.jpg", alt: "Boss relic choice" },
          { src: "/media/kor-ve-kul/10.jpg", alt: "Victory and run summary" },
        ],
      },
    ],
  },
  {
    slug: "tech",
    name: "Neuvikon Tech",
    short: "Tech",
    tagline: "Web and mobile products, and the backend under them.",
    intro:
      "On the Tech side we take on the whole product: interface, server, data " +
      "and deployment. Because the team is small we cap complexity early and " +
      "prefer shipping something that works over something that is complete.",
    capabilities: [],
    projects: [
      {
        name: "Today's Word",
        tagline: "The word of the day.",
        description:
          "One English word a day, the same one for everyone: its meaning, " +
          "real-world examples and where it comes from, then a short quiz. " +
          "Words you have learned come back later so they actually stick, " +
          "and a daily tracker keeps the streak. No accounts.",
        status: "released",
        tags: ["Education", "Language learning", "Vocabulary", "Daily"],
        image: "/apps/todays-word.jpg",
        links: [{ label: "App Store", href: "https://apps.apple.com/app/todays-word-learn-everyday/id6810232514" }],
        media: [
          { src: "/media/today-s-word/store-en-01.jpg", alt: "One new word every day" },
          { src: "/media/today-s-word/store-en-02.jpg", alt: "See it in real sentences" },
          { src: "/media/today-s-word/store-en-03.jpg", alt: "Where it comes from" },
          { src: "/media/today-s-word/store-en-04.jpg", alt: "A little quiz to make it stick" },
          { src: "/media/today-s-word/store-en-05.jpg", alt: "A streak that forgives you" },
          { src: "/media/today-s-word/store-en-06.jpg", alt: "Words that stay" },
          { src: "/media/today-s-word/01.jpg", alt: "The word of the day" },
          { src: "/media/today-s-word/02.jpg", alt: "Where the word comes from" },
          { src: "/media/today-s-word/03.jpg", alt: "Review quiz" },
          { src: "/media/today-s-word/04.jpg", alt: "Daily quiz" },
          { src: "/media/today-s-word/05.jpg", alt: "Quiz result" },
          { src: "/media/today-s-word/06.jpg", alt: "A year of progress" },
          { src: "/media/today-s-word/07.jpg", alt: "A word from a past day" },
          { src: "/media/today-s-word/08.jpg", alt: "Words learned so far" },
          { src: "/media/today-s-word/09.jpg", alt: "Practice" },
          { src: "/media/today-s-word/10.jpg", alt: "Settings" },
        ],
      },
      {
        name: "WordDeck",
        tagline: "Exam vocabulary, just before you forget it.",
        description:
          "English vocabulary flashcards. Every word " +
          "comes with its Turkish meanings, an English definition, an " +
          "example sentence, synonyms and antonyms; spaced repetition brings " +
          "each card back just before it would slip. No accounts: progress " +
          "is tied to a random id the device makes.",
        status: "building",
        tags: ["Education", "Flashcards", "Spaced repetition", "English"],
        image: "/apps/worddeck.png",
        links: [{ label: "Privacy Policy", href: "/en/privacy/worddeck" }],
        media: [
          { src: "/media/worddeck/store-tr-01.jpg", alt: "Learn exam words for good" },
          { src: "/media/worddeck/store-tr-02.jpg", alt: "Flip the card, see the meaning" },
          { src: "/media/worddeck/store-tr-03.jpg", alt: "Review before you forget" },
          { src: "/media/worddeck/store-tr-04.jpg", alt: "Exam-style tests" },
          { src: "/media/worddeck/store-tr-05.jpg", alt: "Grammar in the language of the exam" },
          { src: "/media/worddeck/store-tr-06.jpg", alt: "A little every day, keep the streak" },
          { src: "/media/worddeck/01.png", alt: "Today's deck" },
          { src: "/media/worddeck/02.png", alt: "Flashcard, front" },
          { src: "/media/worddeck/03.png", alt: "Card back with the spaced-repetition rating" },
          { src: "/media/worddeck/04.png", alt: "Decks" },
          { src: "/media/worddeck/05.png", alt: "Test yourself: five-choice practice quizzes" },
          { src: "/media/worddeck/06.png", alt: "Grammar topics" },
        ],
      },
      {
        name: "Neu-Source",
        tagline: "Which ticket the agent is on, and what it spent.",
        description:
          "An internal platform written in Next.js and TypeScript. The " +
          "neuvikon CLI connects to it and reports which ticket a coding " +
          "agent is working on and how many tokens it spent.",
        status: "released",
        tags: ["Developer tool", "Project management", "AI agents"],
        links: [
          { label: "neuvikon.space", href: "https://www.neuvikon.space/" },
        ],
        media: [
          { src: "/media/neu-source/01.png", alt: "Landing page and the live agent board", wide: true },
          { src: "/media/neu-source/02.png", alt: "An agent session tied to a ticket", wide: true },
          { src: "/media/neu-source/03.png", alt: "Agent spend dashboard", wide: true },
          { src: "/media/neu-source/04.png", alt: "Wiki pages and link graph", wide: true },
          { src: "/media/neu-source/05.png", alt: "Personal workspace", wide: true },
        ],
      },
      {
        name: "Eclosion",
        tagline: "Grow in six areas at once.",
        description:
          "A habit tracker. It follows six areas of personal development " +
          "separately; progress accumulates as long as the daily streak holds.",
        status: "building",
        tags: ["Habit tracker", "Self-improvement", "Gamified"],
        image: "/apps/eclosion.png",
        media: [
          { src: "/media/eclosion/store-tr-01.jpg", alt: "Level up your life" },
          { src: "/media/eclosion/store-tr-02.jpg", alt: "Every quest earns XP" },
          { src: "/media/eclosion/store-tr-03.jpg", alt: "Every level is a soldier" },
          { src: "/media/eclosion/store-tr-04.jpg", alt: "Three shadows, one elite" },
          { src: "/media/eclosion/store-tr-05.jpg", alt: "One oath, one dragon" },
          { src: "/media/eclosion/store-tr-06.jpg", alt: "Keep the streak" },
          { src: "/media/eclosion/store-koru-tr-01.jpg", alt: "Grove world: level up your life" },
          { src: "/media/eclosion/store-koru-tr-02.jpg", alt: "Skill tree: grow branch by branch" },
          { src: "/media/eclosion/store-koru-tr-03.jpg", alt: "Every level is a seed" },
          { src: "/media/eclosion/store-koru-tr-04.jpg", alt: "Grafting bench: three plants, one elite" },
          { src: "/media/eclosion/store-koru-tr-05.jpg", alt: "One oath, one tree" },
          { src: "/media/eclosion/store-koru-tr-06.jpg", alt: "Progress calendar: keep the streak" },
          { src: "/media/eclosion/01.png", alt: "World selection: the Shadow Army preview and daily quests" },
          { src: "/media/eclosion/02.png", alt: "Daily quests with rank, XP and area filters" },
          { src: "/media/eclosion/03.png", alt: "Status radar for the six development areas" },
          { src: "/media/eclosion/04.png", alt: "Shadow Army: soldiers, power, morale and the weekly gate" },
          { src: "/media/eclosion/05.png", alt: "Rewards shop: streak shields and personal rewards" },
        ],
      },
    ],
  },
  {
    slug: "robotics",
    name: "Neuvikon Robotics",
    short: "Robotics",
    tagline: "Embedded systems, autonomous robots and hardware prototypes.",
    intro:
      "Robotics works where hardware meets software: systems that read " +
      "sensors, decide, and then do something in the physical world. The " +
      "focus is on shortening the road from prototype to working device.",
    capabilities: [],
    projects: [],
  },
];

export const about: About = {
  lead:
    "Neuvikon is an independent technology studio. We prefer to own a piece " +
    "of work from end to end: design, software, infrastructure and release " +
    "come from the same hands. That is why we run few things at a time and " +
    "try to actually finish each one.",
  /** The short masthead at the top of the page. */
  facts: [
    { label: "Founded", value: "2026" },
    { label: "Location", value: "Türkiye" },
    { label: "Team", value: "7 people" },
    { label: "Divisions", value: "3" },
  ],
  principles: [
    {
      title: "End to end, in house",
      body:
        "From game design to the network layer, from circuit diagram to store " +
        "release, every stage happens inside the studio. Even when we hand " +
        "work out, the architectural decision stays with us.",
    },
    {
      title: "The server is the authority",
      body:
        "In our multiplayer work the client only sends intent; the server " +
        "runs the rules and broadcasts the result. The same rule engine also " +
        "runs on the client, so players feel no latency — but cheating never " +
        "gets past the server wall.",
    },
    {
      title: "Trust the source, not the file",
      body:
        "Our projects bootstrap themselves at launch; nothing is wired into a " +
        "scene by hand. A corrupted binary asset cannot take the system down, " +
        "and everything stays as text under version control.",
    },
    {
      title: "Accessibility is not bolted on",
      body:
        "A colour-blind palette, a shape paired with every player colour, " +
        "text sizing, reduced motion and a left-handed mode are in the first " +
        "release. Accessibility left for later never arrives.",
    },
  ],
  /** No roles: in a studio this size everyone does several jobs. */
  team: ["Vural Bilgin", "Oğulcan Bozkurt", "Arda Özan", "İrem Bozkurt", "Selinay Kıyak", "Eylül Dardoğan", "Zeynep Saygı"],
};

export const careers: Careers = {
  lead:
    "We are looking for a designer. If that is you, a short email is " +
    "enough: a few lines about yourself and some of the work you have " +
    "designed.",
  openings: [
    {
      title: "Designer",
      division: "Games · Tech",
      summary:
        "Someone to design the interfaces, screen flows and visual language " +
        "of our games and apps with us.",
    },
  ],
};
