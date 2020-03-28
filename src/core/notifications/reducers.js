import notificationConfig from "../../config/notificationConfig";

export default function(state = [], action) {
  const { type } = action;

  if (!notificationConfig[type]) return [...state];

  const config = Object.assign({}, notificationConfig[type], {
    id: Date.now()
  });

  return [...state, config];
}
