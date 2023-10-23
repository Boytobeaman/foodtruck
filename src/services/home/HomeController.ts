// import { request } from 'umi';
import request  from "../../utils/request";

export async function queryFoodList(
) {

  return request(
    `${API_ROOT}${API_PREFIX}/getFoods`,
    {
      method: 'GET',
    },
  );
}


export async function queryTruckList(data) {
    return request(
      `${API_ROOT}${API_PREFIX}/getEsFoodTrucks`,
      {
        method: 'POST',
        data
      },
    );
  }