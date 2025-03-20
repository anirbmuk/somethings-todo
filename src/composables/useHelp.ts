import { useModal } from './useModal';

const HELP_TOPICS_MODAL_NAME = 'help-topics-todo-modal' as const;

export const useHelp = () => {

  const {
    showModal: showHelpModal,
    closeModal: closeHelpModal,
  } = useModal(HELP_TOPICS_MODAL_NAME);

  return {
    HELP_TOPICS_MODAL_NAME,
    showHelpModal,
    closeHelpModal,
  };
};
