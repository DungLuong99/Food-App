import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faDrumstickBite,
    faDrumSteelpan,
    faBowlRice,
    faFishFins,
    faAppleAlt,
    faIceCream,
    faBottleDroplet,
} from '@fortawesome/free-solid-svg-icons'

import I1 from '~/assets/img/i1.png'
import F1 from '~/assets/img/f1.png'
import C3 from '~/assets/img/c3.png'
import Fi1 from '~/assets/img/fi1.png'


const heroData = [
    {
        id: 1,
        name: 'Ice Cream',
        ingredient: 'Chocolate & vanilla',
        price: '5.20',
        imageSrc: I1
    },
    {
        id: 2,
        name: 'Strawberries',
        ingredient: 'Fresh Strawberries',
        price: '10.25',
        imageSrc: F1
    },
    {
        id: 3,
        name: 'Chicken Kebab',
        ingredient: 'Mixed Kebab Plate',
        price: '8.25',
        imageSrc: C3
    },
    {
        id: 4,
        name: 'Fish Kebab',
        ingredient: 'Mixed Fish Kebab',
        price: '5.25',
        imageSrc: Fi1
    },
];

const categories = [
    {
        id: 1,
        name: "Chicken",
        urlParamName: "chicken",
        icon: <FontAwesomeIcon icon={faDrumstickBite} />,
    },
    {
        id: 2,
        name: "Curry",
        urlParamName: "curry",
        icon: <FontAwesomeIcon icon={faDrumSteelpan} />,
    },
    {
        id: 3,
        name: "Rice",
        urlParamName: "rice",
        icon: <FontAwesomeIcon icon={faBowlRice} />,
    },
    {
        id: 4,
        name: "Fish",
        urlParamName: "fish",
        icon: <FontAwesomeIcon icon={faFishFins} />,
    },
    {
        id: 5,
        name: "Fruits",
        urlParamName: "fruits",
        icon: <FontAwesomeIcon icon={faAppleAlt} />,
    },
    {
        id: 6,
        name: "Icecreams",
        urlParamName: "icecreams",
        icon: <FontAwesomeIcon icon={faIceCream} />,
    },

    {
        id: 7,
        name: "Soft Drinks",
        urlParamName: "drink",
        icon: <FontAwesomeIcon icon={faBottleDroplet} />,
    },
];

export { heroData, categories }

