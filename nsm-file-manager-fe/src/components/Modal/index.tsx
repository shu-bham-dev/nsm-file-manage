import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';
import CloseIcon from '@mui/icons-material/Close';

export type ModalProps = {
  open: boolean;
  closeModal: () => void;
  children: ReactNode;
  className?: string;
  showModalCloseBtn?: boolean;
  dataTestId?: string;
};

const Modal: FC<ModalProps> = ({
  open,
  closeModal,
  children,
  className = 'w-[442px] h-[322px]',
  showModalCloseBtn = true,
  dataTestId = '',
}) => {
  const panelStyle = clsx('bg-white rounded shadow', className);

  return ReactDOM.createPortal(
    <CSSTransition in={open} timeout={200} classNames="modal" unmountOnExit>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-none"
        onClick={closeModal}
      >
        <div
          className="relative"
          data-testid={dataTestId}
          onClick={(e) => e.stopPropagation()}
        >
          {showModalCloseBtn && (
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500"
            >
              <CloseIcon />
            </button>
          )}
          <div className={panelStyle}>{children}</div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('modal')!
  );
};

export default Modal;
