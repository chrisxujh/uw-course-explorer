import Axios from "axios";

export const getConfig = url => Axios.get(url).then(res => res.data);