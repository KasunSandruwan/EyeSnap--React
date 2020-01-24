import axios from 'axios';
import { API_BASE_URL } from '../config';


export const fetchAllSubscriptionPlans = () => axios({
  method: 'GET',
  url: `${API_BASE_URL}subscriptions`
});
