import { httpService } from "./http.service";

async function toggleNotification(notification) {
  try {
    return await httpService.post("/notification", notification);
  } catch (error) {
    throw error;
  }
}

export const notificationService = { toggleNotification };
