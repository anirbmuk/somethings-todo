export type UiNotification = {
  id: string;
  message: string;
  duration?: number;
  type?: 'success' | 'failure' | 'info';
  cta?: {
    label: string;
    callback: () => void;
  };
  callbackOnClose?: () => void;
  showprogress?: boolean;
};

export type NotificationType = 'queue' | 'replace';
