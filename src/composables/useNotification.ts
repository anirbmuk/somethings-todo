import type {
  UiNotification,
  NotificationType,
} from '@/types/notification';
import { ref } from 'vue';

const notifications = ref<UiNotification[]>([]);

export const useNotification = ({ mode = 'replace' }: { mode: NotificationType } = {
  mode: 'replace',
}) => {

  /**
   * Adds a self-destrucive notification on the GUI
   * @param message Text message to be displayed on notification
   * @param duration in seconds (default 4 seconds)
   */
  const notify = ({
    message,
    type = 'success',
    duration = 4,
    showprogress = false,
    cta,
    callbackOnClose,
  }: Omit<UiNotification, 'id'>) => {
    notifications.value = [...(mode === 'queue' ? notifications.value : []), {
      id: _getUniqueId(message),
      message,
      duration,
      type,
      cta,
      callbackOnClose,
      showprogress,
    }];
  };

  const hide = (id: string) => (notifications.value = [...notifications.value.filter((notification) => notification.id !== id)]);

  const _getUniqueId = (str: string) => {
    const base = str.length;
    // eslint-disable-next-line sonarjs/pseudo-random
    const random = Math.ceil(Math.random() * base * 1_00_000);
    return `notification_${base}_${random}`;
  };

  return {
    notifications,
    notify,
    hide,
  };
};
