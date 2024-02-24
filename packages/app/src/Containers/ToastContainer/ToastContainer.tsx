import {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ToastContext} from '../../Hooks/useToast';
import {AnimatedToast} from './AnimatedToast';
import styles from './ToastContainer.styles';

const ToastContainer: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {toasts} = useContext(ToastContext);

  return (
    <>
      {children}

      <SafeAreaView style={styles.container}>
        {toasts.map((toast) => (
          <AnimatedToast key={toast.key} toast={toast} />
        ))}
      </SafeAreaView>
    </>
  );
};

export default ToastContainer;
