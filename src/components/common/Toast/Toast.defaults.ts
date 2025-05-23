export type ToastType = 'info' | 'success' | 'warning' | 'error';

export default {
  type: 'error' as ToastType,
  title: '',
  message: '',
  active: false,
  persistent: true,
  reload: false,
  button: {
    label: '',
    url: '',
  },
};
