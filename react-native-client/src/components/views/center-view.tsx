import { FC } from 'react';
import { View } from 'react-native';
import { CenterViewProps } from './types';

export const CenterView: FC<CenterViewProps> = ({ children, ...props }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
    >
      {children}
    </View>
  );
};
