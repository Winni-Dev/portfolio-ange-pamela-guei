export const profile = {
  firstName: 'Ange Pamela',
  lastName: 'GUEI',
  role: 'Marketing Digital & Communication',
  photo: '/pamela.jpg',
  cv: '/CV-Ange-Pamela-GUEI.pdf',
  whatsappNumber: '2250758572564',
  email: 'angepamelaguei@gmail.com',
  phone: '07 58 57 25 64',
  phoneHref: 'tel:+2250758572564',
  whatsapp: 'https://wa.me/2250758572564',
  location: 'Koumassi, Abidjan — Côte d’Ivoire',
  age: 22,
  bio: "Titulaire d'une licence en Marketing Digital et d’un BTS en Ressources Humaines et Communication, je suis passionnée par la communication, les réseaux sociaux et l’innovation. Créative, organisée et dotée d’un excellent relationnel, je suis également entrepreneure, fondatrice d’une jeune marque de jus naturels. J’aime transformer les idées en actions concrètes, créer de la valeur et relever des défis avec enthousiasme.",
}

export const stats = [
  { value: 5, suffix: '', label: 'expériences terrain' },
  { value: 2, suffix: '', label: 'diplômes obtenus' },
  { value: 1, suffix: '', label: 'marque créée' },
  { value: 3, suffix: '+', label: 'réseaux pilotés' },
]

export const levelLabels = { 1: 'Notions', 2: 'Débutante', 3: 'Intermédiaire', 4: 'Avancé', 5: 'Expert' }

// Compétences regroupées par domaine (niveaux issus du CV, sur 5)
export const skillGroups = [
  {
    key: 'digital',
    name: 'Digital & Réseaux',
    icon: 'Smartphone',
    color: 'coral',
    summary: 'Faire exister une marque en ligne et créer de l’engagement.',
    skills: [
      {
        name: 'Gestion des réseaux sociaux',
        level: 4,
        desc: 'Facebook, TikTok et WhatsApp Business : planning, modération et animation au quotidien.',
        proof: 'AB Immobilier · Worldive · Marina Resto-Bar',
      },
      {
        name: 'Communication digitale',
        level: 4,
        desc: 'Stratégies de communication adaptées à chaque canal, image de marque cohérente.',
        proof: 'Licence Marketing Digital',
      },
      {
        name: 'Marketing digital',
        level: 3,
        desc: 'Campagnes publicitaires ciblées pour générer des prospects qualifiés.',
        proof: 'AB Immobilier Services',
      },
    ],
  },
  {
    key: 'creation',
    name: 'Création',
    icon: 'Palette',
    color: 'mango',
    summary: 'Produire des visuels et vidéos qui captent l’attention.',
    skills: [
      {
        name: 'Création de contenu visuel',
        level: 3,
        desc: 'Affiches, flyers, bannières, photos de biens et montages vidéo.',
        proof: 'Worldive · AB Immobilier',
      },
    ],
  },
  {
    key: 'commercial',
    name: 'Commercial',
    icon: 'Handshake',
    color: 'mint',
    summary: 'Transformer un prospect en client, puis en client fidèle.',
    skills: [
      {
        name: 'Techniques de vente immobilière',
        level: 3,
        desc: 'Visites de sites, découverte du besoin, accompagnement jusqu’à la signature.',
        proof: 'AB Immobilier Services',
      },
      {
        name: 'Prospection commerciale',
        level: 3,
        desc: 'Prospection terrain et digitale, négociation de partenariats B2B.',
        proof: 'AB Immobilier Services',
      },
      {
        name: 'Fidélisation client',
        level: 3,
        desc: 'Suivi de la relation client et actions pour faire revenir la clientèle.',
        proof: 'Marina Resto-Bar · WhatsApp Business',
      },
    ],
  },
  {
    key: 'outils',
    name: 'Outils & Organisation',
    icon: 'Laptop',
    color: 'lilac',
    summary: 'Organiser, rédiger et suivre le travail au quotidien.',
    skills: [
      {
        name: 'Outils bureautiques',
        level: 3,
        desc: 'Rapports, comptes rendus, notes de service et tableaux de suivi.',
        proof: 'Stage RH · Hôpital de Lakota',
      },
    ],
  },
]

export const softSkills = ['Créative', 'Organisée', 'Excellent relationnel', 'Esprit entrepreneur', 'Dynamique', 'Sens du service']

export const languages = [
  { name: 'Français', level: 5, note: 'Langue maternelle' },
  { name: 'Anglais', level: 1, note: 'Notions' },
]

export const marquee = [
  'Community Management',
  'Facebook',
  'TikTok',
  'WhatsApp Business',
  'Création de contenu',
  'Campagnes Ads',
  'Génération de leads',
  'Branding',
  'Montage vidéo',
  'Relation client',
]

export const experiences = [
  {
    title: 'Chargée Marketing & Communication Immobilière',
    company: 'AB Immobilier Services',
    place: 'Abidjan',
    date: '2026',
    tag: 'Immobilier',
    points: [
      ['Stratégie Social Media', 'gestion, modération et animation de Facebook et TikTok ; WhatsApp Business pour la fidélisation.'],
      ['Création de contenu', 'visuels, affiches, photos et vidéos de présentation de biens.'],
      ['Prospection & Leads', 'campagnes digitales pour générer des prospects qualifiés + prospection terrain.'],
      ['Commercialisation', 'organisation des visites, accompagnement des acquéreurs jusqu’à la signature.'],
      ['Partenariats', 'négociation d’accords B2B avec entreprises, mutuelles et associations.'],
    ],
  },
  {
    title: 'Assistante Marketing & Communication',
    company: 'Worldive',
    place: 'Abidjan',
    date: '2025',
    tag: 'Agence',
    points: [
      ['Stratégie', 'élaboration de stratégies marketing pour les clients de l’entreprise.'],
      ['Design', 'affiches, flyers, bannières et montages vidéo.'],
      ['Réseaux sociaux', 'gestion des comptes et développement de l’image de marque.'],
      ['Campagnes', 'contribution aux campagnes digitales et à la communication globale.'],
    ],
  },
  {
    title: 'Responsable Communication',
    company: 'Marina Resto-Bar',
    place: 'Mission indépendante',
    date: '2025',
    tag: 'Freelance',
    points: [
      ['Digital', 'gestion de toute la communication digitale du restaurant.'],
      ['Visibilité', 'création de contenus et amélioration de la présence en ligne.'],
      ['Fidélisation', 'stratégie pour attirer et fidéliser la clientèle.'],
      ['Pilotage', 'suivi des performances et propositions d’actions marketing.'],
    ],
  },
  {
    title: 'Stagiaire en Ressources Humaines',
    company: 'Établissement Public Hospitalier',
    place: 'Lakota',
    date: 'Août – Oct. 2025',
    tag: 'RH',
    points: [
      ['Administration', 'dossiers, absences, congés et affectations du personnel.'],
      ['Reporting', 'rapports RH : présences, retards, discipline, réunions.'],
      ['Recrutement', 'suivi du recrutement et intégration de nouveaux agents.'],
      ['Communication interne', 'notes de service et comptes rendus.'],
    ],
  },
  {
    title: 'Hôtesse d’accueil',
    company: 'FICI — Forum de l’Investissement Immobilier',
    place: 'Abidjan',
    date: '2025',
    tag: 'Événementiel',
    points: [
      ['Accueil', 'visiteurs, partenaires et VIP.'],
      ['Image', 'présentation des stands et valorisation du forum.'],
      ['Service', 'service client professionnel et chaleureux.'],
    ],
  },
]

export const education = [
  {
    title: 'Licence professionnelle en Marketing Digital',
    school: 'École des Spécialités Multimédia d’Abidjan',
    date: '2025',
    desc: 'Stratégies de communication multicanal, contenus visuels & multimédias, relation client digitale.',
  },
  {
    title: 'BTS Ressources Humaines & Communication',
    school: 'École des Spécialités Multimédia d’Abidjan',
    date: '2023 – 2024',
    desc: 'Recrutement & gestion du personnel, droit du travail, communication interne.',
  },
  {
    title: 'Baccalauréat',
    school: 'Lycée Prosper Mérimée, Cocody',
    date: '2021 – 2022',
    desc: 'Diplôme de fin d’études secondaires.',
  },
]

// Écrans du téléphone animé au scroll
export const phoneScreens = [
  {
    key: 'social',
    kicker: '01 — Social Media',
    title: 'J’anime des communautés qui engagent.',
    text: 'Facebook, TikTok, WhatsApp Business : planification, modération et animation au quotidien pour créer une vraie relation avec la marque.',
  },
  {
    key: 'content',
    kicker: '02 — Création de contenu',
    title: 'Des visuels qui arrêtent le scroll.',
    text: 'Affiches, flyers, bannières, photos et vidéos de biens immobiliers : un contenu pensé pour capter l’attention en moins de 2 secondes.',
  },
  {
    key: 'leads',
    kicker: '03 — Leads & Ventes',
    title: 'Du clic jusqu’à la signature.',
    text: 'Campagnes publicitaires ciblées, prospects qualifiés, visites de sites et accompagnement client jusqu’à la conclusion de la vente.',
  },
]
