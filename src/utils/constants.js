import { ROUTES } from "./route";

export const BASE_URL = "https://api.escuelajs.co/api/v1";

export const listForProfile = [
  { id: 1, to: ROUTES.HOME, label: "Back to Store" },
  { id: 2, to: ROUTES.NOTFOUND, label: "Cards" },
  { id: 3, to: ROUTES.NOTFOUND, label: "Messages" },
  { id: 4, to: ROUTES.NOTFOUND, label: "E-Check" },
  { id: 5, to: ROUTES.NOTFOUND, label: "Bonuses" },
];

export const profileActions = [
  {
    id: 1,
    to: ROUTES.SETTINGS,
    label: "Edit",
    icon: `${process.env.PUBLIC_URL}/newSprite.svg#edits`,
  },
  {
    id: 2,
    to: ROUTES.NOTFOUND,
    label: "Update Card",
    icon: `${process.env.PUBLIC_URL}/newSprite.svg#card2`,
  },
  {
    id: 3,
    to: ROUTES.NOTFOUND,
    label: "Order History",
    icon: `${process.env.PUBLIC_URL}/newSprite.svg#payment`,
  },
  {
    id: 4,
    to: ROUTES.PROFILE,
    label: "Favorites",
    icon: `${process.env.PUBLIC_URL}/sprite.svg#heart`,
    isHeart: true,
  },
  {
    id: 5,
    to: ROUTES.CART,
    label: "Cart",
    icon: `${process.env.PUBLIC_URL}/sprite.svg#bag`,
  },
];
