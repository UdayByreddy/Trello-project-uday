import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerStyle={{
        top: '20px',
      }}
      toastOptions={{
        duration: 5000,
        style: {
          background: '#333333',
          color: '#FFFFFF',
          fontSize: '16px',
          fontWeight: '500',
          padding: '12px 16px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        },
        success: {
          duration: 4000,
          style: {
            background: '#4CAF50',
            color: '#FFFFFF',
          },
          iconTheme: {
            primary: '#FFFFFF',
            secondary: '#4CAF50',
          },
        },
        error: {
          duration: 5000,
          style: {
            background: '#F44336',
            color: '#FFFFFF',
          },
          iconTheme: {
            primary: '#FFFFFF',
            secondary: '#F44336',
          },
        },
      }}
    />
  );
};

export default Toast;
