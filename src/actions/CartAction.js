import { createAction } from "redux-actions";
import { CartActionTypes } from "./../actions/actionsTypes";
import { Alert } from "react-native";

const cartStaff = [
  {
    name: 'Кольцо всевластия',
    score: 1000,
    rarity: 0.01
  },
  {
    name: 'Перчатка Таноса',
    score: 990,
    rarity: 0.05
  },
  {
    name: 'Мешок золота',
    score: 950,
    rarity: 0.07
  },
  {
    name: 'Обломок космического корабля',
    score: 900,
    rarity: 0.1
  },
  {
    name: 'Магическая шляпа',
    score: 880,
    rarity: 0.2
  },
  {
    name: 'Кубок по квидичу',
    score: 710,
    rarity: 0.29
  },
  {
    name: 'Кресло директора',
    score: 640,
    rarity: 0.36
  },
  {
    name: 'Диплом магистра',
    score: 600,
    rarity: 0.4
  },
  {
    name: 'Сладкий сон',
    score: 530,
    rarity: 0.47
  },
  {
    name: 'Диплом бакалавра',
    score: 500,
    rarity: 0.5
  },
  {
    name: 'Кошелек',
    score: 480,
    rarity: 0.6
  },
  {
    name: 'Военный билет',
    score: 400,
    rarity: 0.62
  },
  {
    name: 'Слон',
    score: 350,
    rarity: 0.65
  },
  {
    name: 'Автомат на экзамене',
    score: 200,
    rarity: 0.7
  },
  {
    name: 'Сеть',
    score: 100,
    rarity: 0.75
  },
  {
    name: 'Старый ботинок',
    score: 90,
    rarity: 0.8
  },
  {
    name: 'Значок',
    score: 70,
    rarity: 0.85
  },
  {
    name: 'Лист бумаги',
    score: 30,
    rarity: 0.9
  },
  {
    name: 'Камушек',
    score: 20,
    rarity: 0.93
  },
  {
    name: 'Пыль',
    score: 10,
    rarity: 0.95
  },
];

const getRandomStaff = () => (dispatch, getState) => {
    let randomNum = getRandomNum();
    let randomStaff = cartStaff[randomNum];
    Alert.alert(
      'Поздравляем! Ты получил:',
      `${randomStaff.name} стоимостью ${randomStaff.score} очков!`,
      [
        {text: 'OK', onPress: () => dispatch(pushRandomStaffSuccues(randomStaff))},
      ],
      {cancelable: false},
    );
};

const getRandomNum = () => {
    return Math.floor(Math.random() * cartStaff.length);
};

const pushRandomStaffSuccues = data => {
    return {
      type: CartActionTypes.PUSH_RANDOM_STAFF_TO_CART,
      payload: data,
    };
};

const removeRandomStaffSuccues = () => {
  return {
    type: CartActionTypes.REMOVE_RANDOM_STAFF_FROM_CART
  };
};

const removeRandomStaffByPoliceSuccues = () => {
  return {
    type: CartActionTypes.REMOVE_RANDOM_STAFF_FROM_CART_BY_POLICE
  };
}

const getFullCartAlert = () => () => {
  Alert.alert(
    'Твой инвентарь полон!',
    'Найди Базар чтобы сдать награбленное и продолжай охоту!',
    [
      {text: 'OK'},
    ],
    {cancelable: false},
  );
};

const goToBazar = () => (dispatch) => {
  Alert.alert(
    'Ты пришел на Базар',
    'Хочешь сдать всё награбленное?',
    [
      {
        text: 'Уйти с Базара',
        style: 'cancel',
      },
      {text: 'Да!', onPress: () => dispatch(removeRandomStaffSuccues())},
    ],
    {cancelable: false},
  );
}

const goToPolice = () => (dispatch) => {
  Alert.alert(
    'Ууууупс!! Полиция!',
    'Всё награбленное будет конфисковано!',
    [
      {text: 'Окааай :(((', onPress: () => dispatch(removeRandomStaffByPoliceSuccues())},
    ],
    {cancelable: false},
  );
}

export default { getRandomStaff, getFullCartAlert, goToBazar, goToPolice };