const mockPlant = [
    {
      id: 1,
      current_name: 'Monstera',
      scientific_name: 'Monstera deliciosa',
      image: require('../assets/images/plant.png'),
      status: 'Bonne santé',
      statusColor: '#E9FCD4',
      details: "Le Monstera, aussi appelé \"plante fromage suisse\" en raison de ses feuilles perforées, est une plante tropicale grimpante facile à entretenir. Elle apporte une touche exotique aux intérieurs.",

      guides: [
        {
          icon: 'water-outline',
          title: 'Humidité',
          description: "Arrosage modéré. Laisser sécher le sol en surface avant d’arroser.",
          
        },
        {
          icon: 'sunny-outline',
          title: 'Lumière',
          description: 'Lumière indirecte brillante, éviter le soleil direct qui peut brûler les feuilles.'
        },
        {
          icon: 'thermometer-outline',
          title: 'Température',
          description: 'Température ambiante (18-25°C), éviter les courants d\'air froids.'
        }
      ],
      diagnostics: [
        {
          title: 'Diagnostiques de la plante',
          description: "Les feuilles jaunissent et les tiges sont molles, indiquant un excès d'arrosage et un début de pourrissement des racines. Réduisez l'arrosage et assurez un bon drainage. Quelques taches brunes suggèrent un air trop sec, augmentez l'humidité."
        }
      ]    },
    {
      id: 2,
      current_name: 'Pothos',
      scientific_name: 'Epipremnum aureum',
      image: require('../assets/images/plant2.png'),
      status: 'Affaibli',
      statusColor: '#FFF7DB', 
      details: "Le Pothos est une plante d'intérieur très populaire et facile à cultiver. Ses feuilles en forme de cœur peuvent être vertes, jaunes ou panachées. Il est connu pour sa capacité à purifier l'air.",
    guides: [
      {
        icon: 'water-outline',
        title: 'Humidité',
        description: 'Arroser lorsque le substrat est sec sur plusieurs centimètres.'
      },
      {
        icon: 'sunny-outline',
        title: 'Lumière',
        description: 'S\'adapte à diverses conditions de lumière, préfère une lumière indirecte.'
      }
    ],
    diagnostics: [
      {
        title: 'Diagnostiques de la plante',
        description: "Les feuilles pâles et la croissance ralentie peuvent indiquer un manque de lumière. Les bords bruns des feuilles peuvent être un signe de sous-arrosage ou d'un air trop sec."
      }]
    },
  ];
  
  export default mockPlant;
  